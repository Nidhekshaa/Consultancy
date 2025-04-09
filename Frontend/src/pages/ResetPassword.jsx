import React, { useContext } from "react";
import "../styles/ResetPassword.css";
import { RecoveryContext } from "../App1";

export default function ResetPassword() {

const { setPage } = useContext(RecoveryContext);
  function changePassword() {
    setPage("login");
    alert("Password changed successfully!");
  }

  return (
    <div className="reset-container">
      <section className="reset-section">
        <div className="reset-wrapper">
          <div className="reset-card">
            <h2 className="reset-title">Change Password</h2>
            <form className="reset-form">
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
                  required
                />
              </div>
              <div className="reset-checkbox-wrapper">
                
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="reset-checkbox"
                  required 
                />
                <label className="remember">
                  Remember me
                </label>
              </div>
            </form>
            <button onClick={changePassword} className="reset-button">
              Reset password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
