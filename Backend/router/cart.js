const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");

// Save cart items
router.post("/", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart items are required" });
    }

    const cart = new Cart({ items: cartItems });
    await cart.save();

    res.status(201).json({ message: "Cart saved successfully", cartId: cart._id });
  } catch (err) {
    console.error("Error saving cart:", err);
    res.status(500).json({ error: "Failed to save cart" });
  }
});

// Get latest cart
router.get("/latest", async (req, res) => {
  try {
    const cart = await Cart.findOne().sort({ createdAt: -1 });
    res.json(cart || {});
  } catch (err) {
    console.error("Error fetching latest cart:", err);
    res.status(500).json({ error: "Failed to fetch latest cart" });
  }
});

module.exports = router;
