// recovery.js
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();
router.post("/send_recovery_email", async (req, res) => {
  console.log("Incoming request body:", req.body);
  const { OTP, recipient_email } = req.body;

  if (!OTP || !recipient_email) {
    return res.status(400).json({ message: "Missing OTP or recipient email" });
  }
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Set ✅" : "Not Set ❌");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use STARTTLS instead of SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });    

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: recipient_email,          // Recipient email
      subject: "Password Reset OTP", // Email subject
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP for Password Reset</title>
          <style>
            /* General styles */
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
              color: #333;
            }
            table {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            /* Header styles */
            .email-header {
              background-color: #4CAF50;
              color: #fff;
              padding: 20px;
              text-align: center;
              font-size: 24px;
              border-bottom: 3px solid #388E3C;
            }
            .email-header h1 {
              margin: 0;
            }
            /* Main content styles */
            .email-content {
              padding: 20px;
              font-size: 16px;
            }
            .otp {
              display: inline-block;
              font-size: 32px;
              font-weight: bold;
              background-color: #e7f7e7;
              color: #388E3C;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
            }
            .email-footer {
              text-align: center;
              font-size: 12px;
              color: #888;
              padding: 20px 0;
              border-top: 1px solid #ddd;
            }
            .email-footer a {
              color: #388E3C;
              text-decoration: none;
            }
            /* Responsive Design */
            @media (max-width: 600px) {
              .email-header {
                font-size: 20px;
              }
              .email-content {
                padding: 15px;
              }
              .otp {
                font-size: 28px;
              }
            }
          </style>
        </head>
        <body>
          <table>
            <tr>
              <td class="email-header">
                <h1>Password Reset Request</h1>
              </td>
            </tr>
            <tr>
              <td class="email-content">
                <p>Hi there,</p>
                <p>We received a request to reset your password. Below is your One-Time Password (OTP) to proceed with the reset:</p>
                <div class="otp">${OTP}</div>
                <p>This OTP will expire in 60 Seconds. If you didn’t request a password reset, please ignore this email.</p>
              </td>
            </tr>
            <tr>
              <td class="email-footer">
                <p>Thank you for using our service!</p>
                <p>For any issues, visit <a href="https://support.yourwebsite.com">Support</a></p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `, // OTP in HTML format
    };    
    
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return res.status(500).json({ message: "Failed to send OTP email." });
  }
});

module.exports = router;
