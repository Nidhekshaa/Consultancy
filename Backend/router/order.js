const express = require("express");
const router = express.Router();
const OrderStatus = require("../model/Order");

router.post("/update-status", async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Save to OrderStatus collection (create or update)
    const updatedStatus = await OrderStatus.findOneAndUpdate(
      { orderId },
      { status, updatedAt: new Date() },
      { new: true, upsert: true } // create if doesn't exist
    );

    res.json({ success: true, message: "Status updated", data: updatedStatus });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
