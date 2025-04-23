const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: String,
  quantity: Number,
  image: String,
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
