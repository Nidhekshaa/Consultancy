import React from "react";
import "../styles/Profile.css"; // Import the CSS file

const Profile = () => {
  return (
    <div className="orders-container">
      <header className="header">
        <h1 className="logo"></h1>
        <nav className="nav">
          <a href="#" className="nav-link">Shop</a>
          <a href="#" className="nav-link active">Orders</a>
        </nav>
        <div className="profile-icon">👤</div>
      </header>

      <main className="main-content">
        <h2 className="orders-title">Orders</h2>
        <div className="orders-box">
          <p className="no-orders-text">No orders yet</p>
          <p className="subtext">Go to store to place an order.</p>
        </div>
      </main>

      <footer className="footer">
        <a href="#" className="footer-link">Refund policy</a>
        <a href="#" className="footer-link">Shipping policy</a>
        <a href="#" className="footer-link">Privacy policy</a>
        <a href="#" className="footer-link">Terms of service</a>
      </footer>
    </div>
  );
};

export default Profile;
