const express = require("express");
const router = express.Router();

// Dummy admin credentials (you can later replace this with MongoDB check)
const adminCredentials = {
  email: "admin@example.com",
  password: "Admin123",
  name: "Admin User"
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === adminCredentials.email && password === adminCredentials.password) {
    return res.json({
      success: true,
      name: adminCredentials.name,
      email: adminCredentials.email
    });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
