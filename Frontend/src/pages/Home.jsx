import React from "react";
import "../styles/Styles.css";
import { Search, User, ShoppingBag } from "lucide-react";

function Home() {
  return (
    <div className="App">
      <header className="header">
      <div className="header-content">
        <h2>Timber Mart</h2>
        <p>Making Your Home Into What You Want.</p>
        <nav className="navbar">
        <Search className="icon" onclick="" />
          <div className="icons-container">
            <User className="icon" onclick="" />
            <ShoppingBag className="icon" onclick="" />
          </div>
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
      <div className="container">
        <div className="product-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5UMF7HZHBfBs7FIlF8m5HtwGa1dA2F50XSw&s" alt="product" />
          <h3>Wooden Chair</h3>
          <p>Price: $100</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://isteam.wsimg.com/ip/78ee0992-3610-4fd7-8605-557f65187a4a/ols/4363_original/:/rs=w:600,h:600" alt="product" />
          <h3>Unique Wooden Chair</h3>
          <p>Price: $17,999</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIxkNlbYQ9Xcbt1M_GWBZIo2dLiU2QgUV4w&s" alt="product" />
          <h3>Classic Wooden Sofa</h3>
          <p>Price: $100</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://media.karousell.com/media/photos/products/2024/7/24/unique_wooden_chair_1721784888_084dc3bc_progressive.jpg" alt="product" />
          <h3>Modern Wooden Bench</h3>
          <p>Price: $100</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb57zEhWPJxjduyMV-pj2-Qnr51WqNVKAzoA&s" alt="product" />
          <h3>Handcrafted Wooden Cabinet</h3>
          <p>Price: $100</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://ganpatiarts.com/cdn/shop/products/11_796dec09-5bfd-465e-aecc-b269b34f852e.jpg?v=1710313410&width=2316" alt="product" />
          <h3>Luxury Wooden Bed</h3>
          <p>Price: $40,00</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHou9rNcThFEzBkkUu0Pf8P3e_SqYlDp1GQ&s" alt="product" />
          <h3>Luxury Wooden Bed</h3>
          <p>Price: $100</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://m.media-amazon.com/images/I/81R-44Es6HL.jpg" alt="product" />
          <h3>Elegant Wooden temple</h3>
          <p>Price: $100</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://www.godrejinterio.com/imagestore/B2C/56101509SD00639/56101509SD00639_A2_500x500.jpg" alt="product" />
          <h3>Godrej Wooden Wardrobe</h3>
          <p>Price: $100</p>
          <button onclick="">Add to Cart</button>
        </div>
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
export default Home;