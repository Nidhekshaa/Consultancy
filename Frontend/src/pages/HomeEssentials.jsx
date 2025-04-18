import React from 'react';
import '../styles/Styles.css';
import { Search, User, ShoppingBag } from "lucide-react";
import {  useNavigate  } from "react-router-dom";
import { useEffect , useState } from "react";

function DiningAndKitchen() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const handleUserClick = () => {
      const token = localStorage.getItem("token"); // or however you're tracking auth
  
      if (token) {
        navigate("/profile"); // user is logged in
      } else {
        navigate("/register"); // user not logged in
      }
    };
    const handlenavigate = () => {
      navigate("/cart"); // user not logged in
    };
    useEffect(() => {
      fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error));
    }, []);
  
    const addToCart = async (productId) => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login first!");
        navigate("/login");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId, quantity: 1 }),
        });
  
        if (response.ok) alert("Added to cart!");
        else alert("Error adding to cart");
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    
    return (
      <div className="App">
        <header className="header">
        <div className="header-content">
          <h2>Timber Mart</h2>
          <p>Making Your Home Into What You Want.</p>
          <nav className="navbar">
          {/* <Search className="icon" onclick="" /> */}
            
            <nav className="navbar">
            <a href="/" class="nav-link">Home</a>
              <a href="/Living-Room" class="nav-link">Living Room</a>
              <a href="/Bedroom" class="nav-link">Bedroom</a>
              <a href="/Cabinetry"class="nav-link">Cabinetry</a>
              <a href="/Dining-&-Kitchen" class="nav-link">Dining & Kitchen</a>
              <a href="/Seating" class="nav-link">Seating</a>
              <a href="/Home-Essentials" class="nav-link active">Home Essentials</a>
          <div className="icons-container">
          <User className="icon" onClick={handleUserClick} />
            <div className="cart-icon-container" >
            <ShoppingBag className="cart-icon" onClick={handlenavigate}/>
            <span className="cart-badge">0</span>
          </div>
            </div>
            </nav>
          </nav>
        </div>
      </header>
  
      <div className="container">
        <div className="product-card">
            <img src="" alt="product" />
            <h3>Roof Sheets</h3>
            <p>Price: $1,355</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
        </div>
        <div className="product-card">
            <img src="" alt="product" />
            <h3>Unique Wooden Chair</h3>
            <p>Price: $17,999</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
        </div>
        <div className="product-card">
            <img src="" alt="product" />
            <h3>Classic Wooden Sofa</h3>
            <p>Price: $100</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
        </div>
        <div className="product-card">
        <img src="" alt="product" />
            <h3>Modern Wooden Bench</h3>
            <p>Price: $100</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
        </div>
        <div className="product-card">
        <img src="" alt="product" />
            <h3>Handcrafted Wooden Cabinet</h3>
            <p>Price: $100</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
        </div>
        <div className="product-card">
        <img src="" alt="product" />
            <h3>Luxury Wooden Bed</h3>
            <p>Price: $40,00</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
        </div>
        <div className="product-card">
        <img src="" alt="product" />
            <h3>Luxury Wooden Bed</h3>
            <p>Price: $100</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
        </div>
        <div className="product-card">
        <img src="" alt="product" />
            <h3>Elegant Wooden temple</h3>
            <p>Price: $100</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
        </div>
        <div className="product-card">
        <img src="" alt="product" />
            <h3>Godrej Wooden Wardrobe</h3>
            <p>Price: $100</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        </div>
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
export default DiningAndKitchen;
