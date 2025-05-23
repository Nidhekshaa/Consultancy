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

router.get("/category-stats", async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$category", // Assuming `category` field exists in your schema
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert result to { categoryName: count }
    const result = {};
    stats.forEach((item) => {
      result[item._id] = item.count;
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching category stats:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
