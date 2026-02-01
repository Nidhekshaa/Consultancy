import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "../styles/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    try {
      setError("");
      await axios.post(`${config.API_BASE_URL}/auth/send-otp`, { email });
      startTimer();
      alert("OTP sent");
    } catch (err) {
      setError("Failed to send OTP");
    }
  };

  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only numbers
    if (!value) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    // move focus to next
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }

    setOtp(newOtp.join(""));
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const verifyOtp = async () => {
    try {
      setError("");
      const res = await axios.post(`${config.API_BASE_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      navigate(`/reset-password?token=${res.data.token}`);
    } catch (err) {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-title">Forgot Password</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="forgot-password-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="forgot-password-button"
          onClick={sendOtp}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend in ${timer}s` : "Send OTP"}
        </button>
        <br />
        {/* OTP boxes */}
        <div className="otp-container">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="otp-box"
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
            />
          ))}
        </div>

        <button className="forgot-password-button" onClick={verifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}
