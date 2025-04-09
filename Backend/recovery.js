// recovery.js
const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();
router.post("/send_recovery_email", async (req, res) => {
  console.log("Incoming request body:", req.body);
  const { OTP, recipient_email } = req.body;

  if (!OTP || !recipient_email) {
    return res.status(400).json({ message: "Missing OTP or recipient email" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use STARTTLS instead of SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });    

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient_email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP is: <strong>${OTP}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return res.status(500).json({ message: "Failed to send OTP email." });
  }
});

module.exports = router;
