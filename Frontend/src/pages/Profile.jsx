import React from 'react';
import { User, ShoppingBag } from 'lucide-react';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const navigate = useNavigate();
    const handlechangepassword = () => {
        navigate("/forgot-password");
    }
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
                            <User className="icon" onClick={handleUserClick}/>
                            <div className="cart-icon-container" >
                            <ShoppingBag className="cart-icon" onClick={handlenavigate}/>
                            <span className="cart-badge">0</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <div className="profile-container">

                    <div className="profile-info">
                        <h2>Welcome, Nidhekshaa</h2>
                        <p>Email:nidhekshaank.22csd@kongu.edu</p>
                        <p>Order History: 0 Orders</p>
                    </div>

                <div className="profile-actions">
                    <button className="edit-profile-button">Edit Profile</button>
                    <button className="change-password-button" onClick={handlechangepassword}>Change Password</button>
                </div>

                <div className="profile-orders">
                    <ul>
                            <li >Order #</li>
                    </ul>
                </div>

                <div className="profile-settings">
                    <h2>Settings</h2>
                    <ul>
                        <li>Notification Preferences: [Details]</li>
                        <li>Privacy Settings: [Details]</li>
                        <li>Account Security: [Details]</li>
                    </ul>
                </div>

                <div className="profile-logout">
                    <button className="logout-button" onClick={() => {
                        navigate("/login");
                    }}>Logout</button>
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
