import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Order.css";
import { FaTachometerAlt,FaPlus,FaTags,FaShoppingCart,} from "react-icons/fa";

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [orders, setOrders] = useState([]);

  const handledashboard = () => navigate("/admin-dashboard");
  const handleproduct = () => navigate("/add-product-dashboard");
  const handlecategory = () => navigate("/select-category");
  const handleorders = () => navigate("/orders-received");

  useEffect(() => {
    // Fetch orders from backend
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.error("Failed to load orders:", err));
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fixImageUrl = (url) => {
    if (!url) return "https://placehold.co/40x40";
    return url.replace(/\\/g, "/").replace("5000uploads", "5000/uploads");
  };

  return (
    <div className="order-dashboard">
      <div className="order-body">
        <aside className="sidebar">
          <ul>
            <li
              className={path === "/admin-dashboard" ? "active-link" : ""}
              onClick={handledashboard}
            >
              <FaTachometerAlt className="sidebar-icon" />
              Dashboard
            </li>
            <li
              className={path === "/add-product-dashboard" ? "active-link" : ""}
              onClick={handleproduct}
            >
              <FaPlus className="sidebar-icon" />
              Add Product
            </li>
            <li
              className={path === "/select-category" ? "active-link" : ""}
              onClick={handlecategory}
            >
              <FaTags className="sidebar-icon" />
              Category
            </li>
            <li
              className={path === "/orders-received" ? "active-link" : ""}
              onClick={handleorders}
            >
              <FaShoppingCart className="sidebar-icon" />
              Orders
            </li>
          </ul>
        </aside>

        <main className="orders-container">
          <h2>Orders Received</h2>

          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order, index) => (
                <div className="order-card" key={index}>
                  <h4>Order #{index + 1}</h4>
                  <p>
                    <strong>Name:</strong> {order.shippingInfo.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.shippingInfo.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.shippingInfo.phone}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                  </p>
                  <p>
                    <strong>Payment ID:</strong> {order.paymentId}
                  </p>
                  <div className="order-items">
                    <ul className="order-items-list">
                      {order.cartItems.map((item, idx) => (
                        <li key={idx} className="order-item">
                          <img
                            className="order-item-image"
                            src={fixImageUrl(item.image)}
                            alt={item.name}
                            onClick={handleImageClick}
                          />
                          <div className="order-item-details">
                            <span className="order-item-name">{item.name}</span>
                            <span className="order-item-qty">
                              Qty {item.quantity}
                            </span>
                          </div>
                          {isModalOpen && (
                            <div
                              className="modal-overlay"
                              onClick={handleCloseModal}
                            >
                              <div className="modal-content">
                                <img
                                  src={fixImageUrl(item.image)}
                                  alt="Full view"
                                  className="modal-image"
                                />
                              </div>
                            </div>
                          )}
                          <div className="order-item-price">₹{item.price}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    <strong>Total:</strong> ₹{order.grandTotal}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Orders;
