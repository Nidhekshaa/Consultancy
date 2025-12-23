import { useState, useContext } from "react";
import axios from "axios";
import { RecoveryContext } from "../App1";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);

      axios
        .post(`${API_URL}/send_recovery_email`, {
          OTP,
          recipient_email: email,
        })
        .then(() => setPage("otp"))
        .catch(console.log);
      return;
    }
    return alert("Please enter your email");
  }

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2 className="forgot-password-title">Forgot Password</h2>        

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <input
          type="email"
          className="forgot-password-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" onClick={handleSubmit} className="forgot-password-button">
          Submit 
        </button>

        <p className="forgot-password-link">
          <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
