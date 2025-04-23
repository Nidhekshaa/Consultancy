const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  email: String,
  name: String,
  country: String,
  address: String,
  postalCode: String,
  city: String,
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model("Shipping", shippingSchema);
