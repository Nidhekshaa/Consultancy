import { useContext, useState } from "react";
import { RecoveryContext } from "../App1";
import "../styles/resetpassword.css";

export default function ResetPassword() {
  const { token, setPage } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        alert("Password reset successful");
        setPage("login");
      } else {
        alert("Failed to reset password");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while resetting the password");
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
                  Confirm password
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
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
