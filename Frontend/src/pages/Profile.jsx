import React, { useEffect, useState } from 'react';
import { User, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/auth/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    navigate("/login");
                }
            } catch (err) {
                console.error("Failed to fetch profile", err);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

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
                            <User
                                className="icon"
                                onClick={() => {
                                    const token = localStorage.getItem("token");
                                    navigate(token ? "/profile" : "/register");
                                }}
                            />
                            <ShoppingBag className="icon" />
                        </div>
                    </nav>
                </div>
            </header>

            <div className="profile-container">
                {user ? (
                    <div className="profile-info">
                        <h2>Welcome, {user.name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Order History: {user.orders?.length || 0} Orders</p>
                    </div>
                ) : (
                    <p>Loading user information...</p>
                )}

                <div className="profile-actions">
                    <button className="edit-profile-button">Edit Profile</button>
                    <button className="change-password-button">Change Password</button>
                </div>

                <div className="profile-orders">
                    <ul>
                        {user?.orders?.map((order, index) => (
                            <li key={index}>Order #{index + 1}: {order.details}</li>
                        )) || <li>No orders found.</li>}
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
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>Logout</button>
                </div>
            </div>

            <footer className="footer">
                {/* footer content */}
            </footer>
        </div>
    );
}

export default Profile;
