import React from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css";

const Welcome = () => {
  return (
    <main className="welcome-container">
      <section className="welcome-content">
        <header>
          <h1>Welcome to <span className="highlight">Timber Mart</span></h1>
          <p>Furniture that fits your lifestyle and lasts for generations.</p>
        </header>
        <nav className="welcome-buttons">
          <Link to="/home" className="btn primary">Start Shopping</Link>
          <Link to="/admin-login" className="btn secondary">Admin Login</Link>
        </nav>
      </section>
    </main>
  );
};

export default Welcome;
