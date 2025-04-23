import React from "react";
import { User, ShoppingBag } from "lucide-react";
import '../styles/Header.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  const handlenavigate = () => {
    navigate("/cart");
  };

  return(
    <div>
        <header className="header">
        <div className="header-content">
            <h2>Timber Mart</h2>
            <p>Making Your Home Into What You Want.</p>
            <nav className="navbar">
                <a href="/" className="nav-link active">Home</a>
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
                            <span className="cart-badge">{cartCount}</span>
                    </div>
                </div>
            </nav>
        </div>
        </header>
    </div>
);
}

export default Header;