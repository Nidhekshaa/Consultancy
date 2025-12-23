import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, User } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "./Footer";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(storedCart);
    const withQuantities = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(withQuantities);
    setCartCount(withQuantities.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/profile" : "/register");
  };

  const handlenavigate = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/cart" : "/login");
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartCount(updated.reduce((sum, item) => sum + item.quantity, 0));
  };

  const handleQuantityChange = (_id, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === _id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartCount(updated.reduce((sum, item) => sum + item.quantity, 0));
  };

  const getTotal = (item) => {
    const price = item.price;
    return price * item.quantity;
  };  

  const getGrandTotal = () => {
    return cartItems.reduce((acc, item) => acc + getTotal(item), 0);
  };
  
  const API_URL = process.env.REACT_APP_API_URL;
  const handleNavigate = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      if (res.ok) {
        navigate("/checkout");
      } else {
        alert("Failed to save cart.");
      }
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };
  const fixImageUrl = (url) => {
    return url.replace(/\\/g, "/").replace("5000uploads", "5000/uploads");
  };  

  return (
    <div className="cart-page">
      <header className="header">
        <div className="header-content">
          <h2>Timber Mart</h2>
          <p>Making Your Home Into What You Want.</p>
          <nav className="navbar">
            <a href="/home" className="nav-link">Home</a>
            <a href="/Living-Room" className="nav-link">Living Room</a>
            <a href="/Bedroom" className="nav-link">Bedroom</a>
            <a href="/Cabinetry" className="nav-link">Cabinetry</a>
            <a href="/Dining-and-Kitchen" className="nav-link">Dining & Kitchen</a>
            <a href="/Seating" className="nav-link">Seating</a>
            <a href="/Home-Essentials" className="nav-link">Home Essentials</a>
            <div className="icons-container">
              <User className="icon" onClick={handleUserClick} />
              <div className="cart-icon-container active">
              <FaShoppingCart
                  className="cart-icon"
                  onClick={handlenavigate}
                />
                <span className="cart-badge">{cartCount}</span>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="cart-container">
        <h2>Your Cart</h2>
        <Link to="/home" className="continue-link">← Continue shopping</Link>

        <div className="cart-header">
          <span>PRODUCT</span>
          <span>QUANTITY</span>
          <span>TOTAL</span>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="product-info">
              <img src={fixImageUrl(item.image)} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>Rs. {item.price}</p>
                </div>
              </div>

              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                <Trash2 className="delete-icon" onClick={() => handleRemove(item.id)} />
              </div>

              <div className="total-price">
                Rs. {getTotal(item).toLocaleString("en-IN")}.00
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Grand Total: Rs. {getGrandTotal().toLocaleString("en-IN")}.00</h3>
            <button className="checkout-btn" onClick={handleNavigate}>
              Checkout
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
