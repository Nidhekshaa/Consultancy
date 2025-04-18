const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const recoveryRoutes = require('./recovery');
const Product = require('./model/Product');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB User Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Encrypt password before saving to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/', recoveryRoutes);
// User Registration
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }
  if (!/\d/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one number" });
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one special character" });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered & logged in', token });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" }); 
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }
  if (!/\d/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one number" });
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one special character" });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Add resetToken & tokenExpiry to User schema
userSchema.add({
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

app.use('/', recoveryRoutes);
app.post('/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetURL = `http://localhost:3000/reset-password/${token}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });    

    const mailOptions = {
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset.</p>
             <p>Click this <a href="${resetURL}">link</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/auth/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    req.user = decoded;
    next();
  });
}

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Assuming you're using MongoDB
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Data
app.get('/auth/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid or expired token' });
    const user = await User.findById(decoded.userId).select('-password');
    res.json({ user });
  });
});

const productRoutes = require('./router/productRoutes');
app.use("/api", productRoutes); 


app.get('/cart', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const cart = await Cart.findOne({ userId: decoded.userId });
    if (!cart) return res.json({ products: [] });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));