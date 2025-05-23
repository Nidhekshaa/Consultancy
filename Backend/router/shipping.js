const express = require("express");
const router = express.Router();
const Shipping = require("../model/Shipping");

// POST: Save shipping info
router.post("/", async (req, res) => {
  try {
    const shippingData = req.body;
    const shipping = new Shipping(shippingData);
    await shipping.save();
    res.status(201).json({ message: "Shipping info saved", shippingId: shipping._id });
  } catch (error) {
    console.error("Failed to save shipping info:", error);
    res.status(500).json({ error: "Could not save shipping info" });
  }
});

// ✅ GET: Get the latest shipping info
router.get("/latest", async (req, res) => {
  try {
    const latestInfo = await Shipping.findOne().sort({ createdAt: -1 });
    res.json(latestInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shipping info" });
  }
});

module.exports = router;