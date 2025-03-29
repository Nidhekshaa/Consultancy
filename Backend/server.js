const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
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

// User Registration
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
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

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // 🔹 Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: "Login successful", token });
  } catch (error) {
      console.error("❌ Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


// 🛠 Route: Forgot Password
app.post('/auth/forgot-password', async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash new password & update in database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('❌ Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
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

// Product Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});
const Product = mongoose.model('Product', productSchema);

// Get Products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Cart Model
const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }]
});
const Cart = mongoose.model('Cart', cartSchema);

// Add to Cart
app.post("/cart", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
      cart = new Cart({ userId, products: [] });
  }

  // Add the product to the cart
  cart.products.push({ productId, quantity });
  await cart.save();

  res.json({ message: "Product added to cart" });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));