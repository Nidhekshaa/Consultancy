// recovery.js
const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("./model/User"); // adjust path
require("dotenv").config();

const router = express.Router();
/* =========================================
   CREATE MAIL TRANSPORTER ONCE (better perf)
========================================= */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
/* =========================================
   SEND OTP ROUTE (SECURE)
========================================= */
router.post("/auth/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });

    // Don't reveal if user exists (security best practice)
    if (!user)
      return res.json({ message: "If email exists, OTP sent" });
    /* =============================
       GENERATE OTP IN BACKEND ONLY
    ============================= */
    const otp = crypto.randomInt(100000, 999999).toString();
    /* =============================
       SAVE HASHED OTP
    ============================= */
    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpiry = Date.now() + 60 * 1000; // 60 sec

    await user.save();
    /* =============================
       SEND EMAIL
    ============================= */
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Password Reset</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:4px">${otp}</h1>
          <p>Valid for 60 seconds</p>
        </div>
      `,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

module.exports = router;
