import React, { useEffect, useState } from 'react';
import { User, ShoppingBag } from 'lucide-react';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null); // To store user data
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "{user.name}",
    email: "{user.email}",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch user data from the backend (e.g., API call)
    fetch("http://localhost:5000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUser(data);
          setUpdatedUser(data); // Set default values to be updated
        }
      })
      .catch((err) => setError("Error loading user data."));
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };
  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/profile"; // user is logged in
    } else {
      window.location.href = "/register"; // user not logged in
    }
  };
  
  const handlenavigate = () => {
    window.location.href = "/cart";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    fetch("http://localhost:5000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccess("Profile updated successfully.");
          setIsEditing(false);
        } else {
          setError("Failed to update profile. Please try again.");
        }
      })
      .catch((err) => setError("Error updating profile."));
  };
  if (!user) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h2>Timber Mart</h2>
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
              <div className="cart-icon-container">
                <ShoppingBag className="cart-icon" onClick={handlenavigate} />
                <span className="cart-badge">0</span>
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
            {success && <div className="success-message">{success}</div>}

            {user ? (
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="profile-field">
                  <label htmlFor="name" className="profile-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={isEditing ? updatedUser.name : user.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="profile-input"
                  />
                </div>

                <div className="profile-field">
                  <label htmlFor="email" className="profile-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={isEditing ? updatedUser.email : user.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="profile-input"
                  />
                </div>

                <div className="profile-actions">
  {isEditing ? (
    <>
      <button type="submit" className="profile-button">
        Save Changes
      </button>
      <button
        type="button"
        onClick={handleEditToggle}
        className="profile-button"
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      type="button"
      onClick={handleEditToggle}
      className="profile-button"
    >
      Edit Profile
    </button>
  )}
</div>

              </form>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </section>

        <div className="profile-logout">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
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

export default Profile;
