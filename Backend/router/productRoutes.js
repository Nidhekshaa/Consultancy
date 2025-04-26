// backend/router/product.js
const express = require('express');
const router = express.Router();
const Product = require('../model/Product'); // adjust if path is different

// Fetch products by category
router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = { $regex: new RegExp('^' + category + '$', 'i') }; // case insensitive match
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
