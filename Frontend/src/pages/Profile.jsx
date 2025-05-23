import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "../pages/Footer";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/profile" : "/register");
  };

  const handlenavigate = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/cart" : "/login");
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://consultancy-4drr.onrender.com/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to load profile information.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h2>Timber Mart</h2>
          <p>Making Your Home Into What You Want.</p>
          <nav className="navbar">
            <a href="/home" className="nav-link active">
              Home
            </a>
            <a href="/Living-Room" className="nav-link">
              Living Room
            </a>
            <a href="/Bedroom" className="nav-link">
              Bedroom
            </a>
            <a href="/Cabinetry" className="nav-link">
              Cabinetry
            </a>
            <a href="/Dining-and-Kitchen" className="nav-link">
              Dining & Kitchen
            </a>
            <a href="/Seating" className="nav-link">
              Seating
            </a>
            <a href="/Home-Essentials" className="nav-link">
              Home Essentials
            </a>
            <div className="icons-container">
              <User className="icon" onClick={handleUserClick} />
              <div className="cart-icon-container">
                <FaShoppingCart className="cart-icon" onClick={handlenavigate} />
                <span className="cart-badge">{cartCount}</span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="profile-container">
        <section className="profile-section">
          <div className="profile-wrapper">
            <div className="profile-card">
              <h2 className="profile-title">User Profile</h2>
              {error && <div className="error-message">{error}</div>}

              {user ? (
                <div className="profile-details">
                  <p>
                    <strong>Name:</strong> {user.user?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.user?.email}
                  </p>
                  <p>
                    <strong>Order Placed:</strong> {user?.orders?.length || 0}
                  </p>
                </div>
              ) : (
                <p>Loading profile...</p>
              )}
            </div>

            <div className="profile-orders">
              <h2>Orders</h2>
              <p>Total Orders Placed: {user?.orders?.length || 0}</p>

              {user?.orders?.length > 0 ? (
                <ul>
                  {user.orders.map((order, index) => (
                    <li key={index} className="order-item">
                      <p>
                        <strong>Order #{index + 1}</strong>
                      </p>
                      <p>
                        <strong>Items:</strong>{" "}
                        {order.items?.map((item) => item.name).join(", ")}
                      </p>
                      <p>
                        <strong>Total:</strong> ₹{order.totalAmount}
                      </p>
                      <p>
                        <strong>Placed on:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders placed yet.</p>
              )}
            </div>
          </div>
        </section>

        <div className="profile-logout">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
