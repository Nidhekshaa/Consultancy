// backend/routes/adminAuth.js or similar file

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Admin login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials (for demo)
  if (email === "admin@example.com" && password === "Admin123") {
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.Admin_JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;
