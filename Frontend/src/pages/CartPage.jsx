import React from "react";
import "../styles/CartPage.css";
import { User, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/profile" : "/register");
  };

  const handleNavigate = () => {
    navigate("/cart");
  };
  const handleDelete = () => {
    // Your logic to remove the item from cart
    console.log("Item deleted");
    // You can also update the state to remove the item from the UI
    // setProducts(products.filter(product => product.id !== id)); // Example if you have a list of products

    // Or you can show a confirmation message or redirect the user
    // alert("Item deleted from cart");
    // navigate("/cart"); // Redirect to cart page if needed
  };
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 28000;

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const totalPrice = pricePerItem * quantity;

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h2 className="logo">Timber Mart</h2>
          <p>Making Your Home Into What You Want.</p>
          <nav className="navbar">
            <a href="/" className="nav-link">Home</a>
            <a href="/Living-Room" className="nav-link">Living Room</a>
            <a href="/Bedroom" className="nav-link">Bedroom</a>
            <a href="/Cabinetry" className="nav-link">Cabinetry</a>
            <a href="/Dining-&-Kitchen" className="nav-link">Dining & Kitchen</a>
            <a href="/Seating" className="nav-link">Seating</a>
            <a href="/Home-Essentials" className="nav-link">Home Essentials</a>
            <div className="icons-container">
              <User className="icon" onClick={handleUserClick} />
              <div className="cart-icon-container" onClick={handleNavigate}>
                <ShoppingBag className="cart-icon" />
                <span className="cart-badge">1</span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Cart Body */}
      <div className="cart-container">
      <h1 className="cart-heading">Your Cart</h1>
        <a className="continue-shopping" href="/">← Continue shopping</a>

        <div className="cart-table">
          <div className="cart-header-row">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <div className="cart-item">
            <div className="product-info">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5UMF7HZHBfBs7FIlF8m5HtwGa1dA2F50XSw&s"
                alt="Groot Coffee Table"
              />
              <div>
                <h3>Groot Coffee Table</h3>
                <p>Rs. 28,000.00</p>
              </div>
            </div>
          <div className="quantity-control">
          <button onClick={decreaseQty} className="qtyBtn">−</button>
          <span className="qtyValue">{quantity}</span>
          <button onClick={increaseQty} className="qtyBtn">+</button>
          <Trash2 className="delete-icon" onClick={handleDelete} />
        </div>
        <div className="total-price">
          <p className="price">Rs. {totalPrice.toLocaleString('en-IN')}.00</p>
        </div>
          </div>
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
              <li><a href="/Our-story">Our Story</a></li>
              <li><a href="/Sustainability">Sustainability</a></li>
              <li><a href="/Gift-Card">Gift Card</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Navigation</h3>
            <ul>
              <li><a href="/About-Us">About Us</a></li>
              <li><a href="/Contact-Us">Contact Us</a></li>
              <li><a href="/Franchisee">Franchisee</a></li>
              <li><a href="/Customise-Order-Policy">Customise Order Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Disclaimer</h3>
            <ul>
              <li><a href="/FAQs">FAQs</a></li>
              <li><a href="/Shipping-Policy">Shipping Policy</a></li>
              <li><a href="/Return/Refund-Policy">Return/Refund Policy</a></li>
              <li><a href="/International-Shipping">International Shipping</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Policies</h3>
            <ul>
              <li><a href="/Privacy-Policy">Privacy Policy</a></li>
              <li><a href="/Terms-of-Use">Terms of Use</a></li>
              <li><a href="/Care-&-Instructions">Care & Instructions</a></li>
              <li><a href="/Maintain-Your-Furniture">Maintain Your Furniture</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
