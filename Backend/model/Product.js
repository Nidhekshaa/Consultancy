
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String // just store the filename
});

module.exports = mongoose.model("Product", productSchema);
