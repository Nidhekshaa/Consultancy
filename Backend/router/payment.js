const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "",
  key_secret: ""
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: "receipt_" + Date.now()
    });
    res.json(order);
  } catch (err) {
    console.error("Order creation failed", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
