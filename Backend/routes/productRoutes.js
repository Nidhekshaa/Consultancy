const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Route to add a product
router.post("/add", async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const newProduct = new Product({ name, price, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
});

// Route to fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;
