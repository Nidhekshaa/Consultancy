import React from "react";
import "../styles/Styles.css";

function AboutUs() {
  return (
    <div className="App">
      <header className="header">
      <div className="header-content">
        <h2>Timber Mart</h2>
        <p>Making Your Home Into What You Want.</p>
        <nav className="navbar">
          <a href="/home">Home</a>
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
      <div class="about-container">
    <h1>About us</h1>
    <p><strong>A Better World in the Making</strong></p>
    <p><em>Since 2017</em></p>
    <p><em>Fighting poverty through fair and ethical trade</em></p>
    <p><strong>Our Mission Statement:</strong> To empower small-scale artisans through long-term trading partnerships, 
    helping them build <strong>sustainable employment, resources, rights, and a vision of hope</strong> in their communities.</p>
        <p>Our story began in 2010 with a vision to provide quality furniture at affordable prices.
            We have come a long way since then and have expanded our product range to include home decor and accessories. 
            Our products are designed to cater to the modern Indian home and are a perfect blend of style and functionality. 
            We are committed to providing our customers with the best shopping experience and are constantly working towards improving our services.</p>
    </div>
    </body>
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
        <div className="footer-section">
          <h3>Policies</h3>
          <ul>
            <a href="/Privacy-Policy">Privacy Policy</a>
            <a href="/Terms-of-Use">Terms of Use</a>
            <a href="/Care-&-Instructions">Care & Instructions</a>
            <a href="/Maintain-Your-Furniture<">Maintain Your Furniture</a>
          </ul>
        </div>
      </div>
    </footer>
    </div>
  );
}
export default AboutUs;
