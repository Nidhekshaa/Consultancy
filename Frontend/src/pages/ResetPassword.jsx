import { useState } from "react";
import "../styles/ResetPassword.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  // Extract token from URL query string
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  // Debug: Show full URL and token
  console.log("Full URL:", window.location.href);
  console.log("Token:", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if token is present
    if (!token) {
      alert("❌ Missing or invalid token in URL.");
      return;
    }

    if (!password) {
      alert("❌ Password cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("✅ Password reset successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("❌ Password reset error:", error.message);
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="reset-container">
      <section className="reset-section">
        <div className="reset-wrapper">
          <div className="reset-card">
            <h2 className="reset-title">Change Password</h2>
            <form className="reset-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="reset-label">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="reset-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="reset-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="reset-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="reset-button">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
