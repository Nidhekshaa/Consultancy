const mongoose = require("mongoose");

const OrderStatusSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderStatusSchema);
