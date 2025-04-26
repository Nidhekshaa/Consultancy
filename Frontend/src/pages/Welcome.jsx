import React from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css"; // Make sure you create this CSS file

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Timber Mart</h1>
        <p>Furniture that fits your lifestyle and lasts for generations.</p>
        <div className="welcome-buttons">
          <Link to="/home" className="btn primary">Start Shopping</Link>
          <Link to="/admin-login" className="btn secondary">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
