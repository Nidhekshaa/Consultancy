import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const [shippingInfo, setShippingInfo] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card"); // or "gpay"
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const shippingCost = 300.0;
  const handlePay = async () => {
    const res = await fetch(`${API_URL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: grandTotal }), // if backend expects it
    });
    const data = await res.json();

    const options = {
      key: "rzp_test_yy480cNXaBQsZO", // Enter the Key ID generated from the Dashboard
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "Your Store",
      description: "Order Payment",
      handler: async function (response) {
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
        // Save the order to your backend
        try {
          await fetch(`${API_URL}/save-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              shippingInfo,
              cartItems,
              grandTotal,
              paymentId: response.razorpay_payment_id,
            }),
          });

          alert("Order saved successfully!");
          navigate("/thank-you");
        } catch (error) {
          console.error("Failed to save order:", error);
          alert("Order saving failed");
        }
      },
      prefill: {
        name: shippingInfo.name,
        email: shippingInfo.email,
        contact: shippingInfo.phone,
      },
      theme: { color: "#3399cc" },
    };

    if (paymentMethod === "gpay") {
      options.method = {
        upi: true,
        card: false,
        netbanking: false,
        wallet: false,
      };
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    // Fetch shipping info from backend
    fetch(`${API_URL}/shipping/latest`)
      .then((res) => res.json())
      .then((data) => {
        setShippingInfo(data || {});
      })
      .catch((err) => console.error("Failed to load shipping info:", err));

    // Fetch cart subtotal
    fetch(`${API_URL}/cart/latest`)
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
          <p>
            <strong>Email:</strong> {shippingInfo.email}
          </p>
          <p>
            <strong>Name:</strong> {shippingInfo.name}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${shippingInfo.address || ""}, ${shippingInfo.city || ""}, ${
              shippingInfo.postalCode || ""
            }, ${shippingInfo.country || ""}`}
          </p>
          <p>
            <strong>Phone:</strong> {shippingInfo.phone}
          </p>

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
          <button
            className="gpay-btn"
            onClick={() => {
              setPaymentMethod("gpay");
              handlePay();
            }}
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
              alt="Google Pay"
              className="gpay-logo"
            />
            Pay
          </button>
          <div className="divider">
            <span>Or pay with card</span>
          </div>
          <input type="text" placeholder="1234 1234 1234 1234" />
          <div className="card-info-row">
            <input type="text" placeholder="MM / YY" />
            <input type="text" placeholder="CVV" />
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="sameAsShipping" defaultChecked />
            <label htmlFor="sameAsShipping">
              My billing address is the same as my shipping address
            </label>
          </div>
          <button
            className="pay-button"
            onClick={() => {
              setPaymentMethod("card");
              handlePay();
            }}
          >
            Pay ₹{grandTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
