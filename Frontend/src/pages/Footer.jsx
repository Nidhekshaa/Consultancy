import React from "react";
import '../styles/Footer.css';
const Footer = () => {
return (
    <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <p>For inboxes with impeccable taste.</p>
            <input type="email" placeholder="Email" className="email-input" />
          </div>
          <div className="footer-section">
            <h3>Information</h3>
            <ul>
              <a href="/Our-story">Our Story</a>
              <a href="/Sustainability">Sustainability</a>
              <a href="/Gift-Card">Gift Card</a>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Navigation</h3>
            <ul>
              <a href="/About-Us">About Us</a>
              <a href="/Contact-Us">Contact Us</a>
              <a href="/Franchisee">Franchisee</a>
              <a href="/Customise-Order-Policy">Customise Order Policy</a>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Disclaimer</h3>
            <ul>
              <a href="/FAQs">FAQs</a>
              <a href="/Shipping-Policy">Shipping Policy</a>
              <a href="/Return/Refund-Policy">Return/Refund Policy</a>
              <a href="/International-Shipping">International Shipping</a>
            </ul>
          </div>
        </div>
      </footer>
);
}
export default Footer;
