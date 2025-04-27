const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../model/Product"); // <-- make sure you import your Product model correctly!
const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Add Product Route
router.post("/api/admin/add-product", upload.single("image"), async (req, res) => {
  const { name, price, category } = req.body;
  const imagePath = req.file?.path;

  if (!name || !price || !category || !imagePath) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      category,
      image: imagePath, // saving the path of uploaded image
    });

    await newProduct.save(); // saving into MongoDB

    console.log("New product added:", newProduct);

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
