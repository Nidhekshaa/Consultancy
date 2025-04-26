import React, { useEffect, useState } from "react";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const naigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 4.0;
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    name: "",
    country: "India",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shippingInfo),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Shipping info saved! Proceeding to payment.");
        naigate("/payment"); // navigate to payment page
        // optionally navigate to success page
      } else {
        alert(data.error || "Failed to save shipping info");
      }
    } catch (error) {
      console.error("Error submitting shipping info:", error);
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/cart/latest")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.items || []);
        const total = (data.items || []).reduce((acc, item) => {
          const price = parseFloat(item.price.replace(/,/g, ""));
          return acc + price * item.quantity;
        }, 0);
        setSubtotal(total);
      })
      .catch((err) => console.error("Failed to load cart:", err));
  }, []);

  const grandTotal = subtotal + shippingCost;

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        {/* Left: Order Summary */}
        <div className="order-summary">
          <h2>Payment Details</h2>
          <h1>₹{grandTotal.toFixed(2)}</h1>

          {cartItems.map((item, index) => (
            <div className="item" key={index}>
              <img
                src={item.image || "https://placehold.co/40x40"}
                alt={item.title}
              />
              <div className="item-details">
                <p>{item.title}</p>
                <span>Qty {item.quantity}</span>
              </div>
              <div className="price">
                ₹
                {(
                  parseFloat(item.price.replace(/,/g, "")) * item.quantity
                ).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="summary-breakdown">
            <div className="row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="row">
              <span>Shipping</span>
              <span>₹{shippingCost.toFixed(2)}</span>
            </div>
            <hr />
            <div className="row total">
              <span>Total due</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="payment-form">
          <h4>Shipping information</h4>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />
          <select name="country" onChange={handleInputChange}>
            <option>India</option>
            <option>United States</option>
            <option>Others</option>
          </select>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleInputChange}
          />

          <div className="add-info-row">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Town/City"
              onChange={handleInputChange}
            />
          </div>
          <input
            type="phone"
            name="phone"
            placeholder="Phone number"
            onChange={handleInputChange}
          />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
