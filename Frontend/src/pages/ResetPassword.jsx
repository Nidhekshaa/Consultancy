import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css";
import config from "../config";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // get token only once
  const token = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("token");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${config.API_BASE_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Reset failed");
      }

      alert("✅ Password reset successful");

      // navigate instead of reload
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2 className="reset-title">Reset Password</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="reset-form">
          <input
            type="password"
            placeholder="New password"
            className="reset-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="reset-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="reset-button"
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
