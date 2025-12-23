const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const dotenv = require("dotenv");
// const Razorpay = require("razorpay");
const path = require('path');

dotenv.config();

// Routers
const recoveryRoutes = require('./recovery');
const productRoutes = require('./router/productRoutes');
const cartRoutes = require("./router/cart");
const shippingRoutes = require("./router/shipping");
const adminRoutes = require("./router/Admin");
const addProductRoute = require("./router/addproduct");
const OrderRoutes = require("./router/order");
// App & Middleware
const app = express();
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const User = require('./model/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// Routes
app.use('/', productRoutes);
app.use('/cart', cartRoutes);
app.use('/shipping', shippingRoutes);
app.use('/', recoveryRoutes);
app.use("/admin", adminRoutes);
app.use(addProductRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));// Serve image files
let orders = []; // memory storage for now


app.post('/save-order', (req, res) => {
  orders.push(req.body);
  res.status(201).send({ message: 'Order saved' });
});

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.use("/api/status", OrderRoutes);

// 🟢 Register
app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  if (password.length < 8)
    return res.status(400).json({ error: "Password must be at least 8 characters" });

  if (!/\d/.test(password))
    return res.status(400).json({ error: "Password must contain at least one number" });

  if (!/[!@#$%^&*]/.test(password))
    return res.status(400).json({ error: "Password must contain at least one special character" });

  if (!/[A-Z]/.test(password))
    return res.status(400).json({ error: "Password must contain at least one uppercase letter" });

  if (!/[a-z]/.test(password))
    return res.status(400).json({ error: "Password must contain at least one lowercase letter" });

  try {
    console.log("Checking for existing user with email:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🟢 Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: 'Token invalid or expired' });

    // Hash and save new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear the reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// 🟢 Middleware
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
}

// 🟢 Protected route
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 🟢 Get user from token
app.get('/auth/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const paymentRoutes = require("./router/payment");
app.use("/", paymentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Timber Mart');
});
// 🟢 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});

