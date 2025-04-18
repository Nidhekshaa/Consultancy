const express = require('express');
const router = express.Router();
const Product = require('../model/Product'); // Make sure this path is correct

// Updated product route using MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedProducts = async () => {


  const sampleProducts = [
    { name: "Wooden Chair", price: 6000, image: "/images/image4.jpeg" },
    { name: "Classic Wooden Sofa", price: 15000, image: "/images/image4.jpeg" },
    { name: "Luxury Wooden Bed", price: 20000, image: "/images/image4.jpeg" },
    { name: "Wooden Chair", price: 6000, image: "/images/image4.jpeg" },
    { name: "Classic Wooden Sofa", price: 15000, image: "/images/image4.jpeg" },
    { name: "Luxury Wooden Bed", price: 20000, image: "/images/image4.jpeg" }
  ];
  
  await Product.insertMany(sampleProducts);
  console.log('✅ Sample products inserted!');
};

seedProducts();

module.exports = router;
