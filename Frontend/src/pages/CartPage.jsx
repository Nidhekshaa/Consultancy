import React from "react";
import "../styles/Styles.css";

function CartProvider() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h2>Timber Mart</h2>
          <p>Making Your Home Into What You Want.</p>
          <nav className="navbar">
            <a href="/Living-Room">Living Room</a>
            <a href="/Bedroom">Bedroom</a>
            <a href="/Cabinetry">Cabinetry</a>
            <a href="/Dining-&-Kitchen">Dining & Kitchen</a>
            <a href="/Seating">Seating</a>
            <a href="/Home-Essentials">Home Essentials</a>
          </nav>
        </div>
      </header>
      <body>
        
      </body>
      <footer className="footer">
        <a href="#" className="footer-link">Refund policy</a>
        <a href="#" className="footer-link">Shipping policy</a>
        <a href="#" className="footer-link">Privacy policy</a>
        <a href="#" className="footer-link">Terms of service</a>
      </footer>
    </div>
  );
}

export default CartProvider;