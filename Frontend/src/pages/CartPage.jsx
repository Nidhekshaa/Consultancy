import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/CartPage.css";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const withQuantities = storedCart.map(item => ({ ...item, quantity: item.quantity || 1 }));
    setCartItems(withQuantities);
  }, []);

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleQuantityChange = (id, delta) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getTotal = (item) => {
    const price = parseInt(item.price.replace(/,/g, ""));
    return price * item.quantity;
  };

  const getGrandTotal = () => {
    return cartItems.reduce((acc, item) => acc + getTotal(item), 0);
  };

  const handleNavigate = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
  
      if (res.ok) {
        // Navigate to checkout only after saving the cart
        window.location.href = "/checkout";
      } else {
        alert("Failed to save cart.");
      }
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };
  

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <h2>Your Cart</h2>
        <Link to="/" className="continue-link">← Continue shopping</Link>

        <div className="cart-header">
          <span>PRODUCT</span>
          <span>QUANTITY</span>
          <span>TOTAL</span>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="product-info">
                <img src={item.image} alt={item.title} />
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
            <button className="checkout-btn" onClick={() => handleNavigate()}>Checkout</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
