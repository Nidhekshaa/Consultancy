import React, { useEffect, useState } from "react";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const [shippingInfo, setShippingInfo] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const shippingCost = 300.0;
  useEffect(() => {
    // Fetch shipping info from backend
    fetch("http://localhost:5000/shipping/latest")
      .then((res) => res.json())
      .then((data) => {
        setShippingInfo(data || {});
      })
      .catch((err) => console.error("Failed to load shipping info:", err));

    // Fetch cart subtotal
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
    <div className="payment-wrapper">
      <div className="payment-container">
        {/* Left: Order Summary */}
        <div className="order-summary">
          <h2>Billing Details</h2>
          <p><strong>Email:</strong> {shippingInfo.email}</p>
          <p><strong>Name:</strong> {shippingInfo.name}</p>
          <p>
            <strong>Address:</strong>{" "}
            {`${shippingInfo.address || ""}, ${shippingInfo.city || ""}, ${
              shippingInfo.postalCode || ""
            }, ${shippingInfo.country || ""}`}
          </p>
          <p><strong>Phone:</strong> {shippingInfo.phone}</p>

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
          <h4>Payment details</h4>
          <button className="gpay-btn">GPay</button>
          <div className="divider">
            <span>Or pay with card</span>
          </div>
          <input type="text" placeholder="1234 1234 1234 1234" />
          <div className="card-info-row">
            <input type="text" placeholder="MM / YY" />
            <input type="text" placeholder="CVV" />
          </div>
          <div className="checkbox-row">
            <input type="checkbox" defaultChecked />
            <label>Billing address is same as shipping</label>
          </div>
          <button className="pay-button">Pay ₹{grandTotal.toFixed(2)}</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
