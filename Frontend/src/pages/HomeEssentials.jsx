import React, { useEffect, useState } from 'react';
import '../styles/Styles.css';
import { Search, User, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'
function HomeEssentials() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: 1 }),
      });

      if (response.ok) alert("Added to cart!");
      else alert("Error adding to cart");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h2>Timber Mart</h2>
          <p>Making Your Home Into What You Want.</p>
          <nav className="navbar">
            <a href="/home" className="nav-link">Home</a>
            <a href="/Living-Room" className="nav-link">Living Room</a>
            <a href="/Bedroom" className="nav-link">Bedroom</a>
            <a href="/Cabinetry" className="nav-link">Cabinetry</a>
            <a href="/Dining-&-Kitchen" className="nav-link">Dining & Kitchen</a>
            <a href="/Seating" className="nav-link">Seating</a>
            <a href="/Home-Essentials" className="nav-link active">Home Essentials</a>
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

      <div className="container">
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/wooden-chest-drawers-with-floral-branches-vase_93675-52181.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wooden Storage Unit</h3>
          <p>Price: ₹4,000</p>
          <button onClick={() => addToCart('wooden-storage-unit')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/vintage-trunks-lamp_1122-674.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Stacked Wooden Trunks</h3>
          <p>Price: ₹6,000</p>
          <button onClick={() => addToCart('stacked-trunks')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/spa-still-life_23-2147821138.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wooden Shelves</h3>
          <p>Price: ₹3,000</p>
          <button onClick={() => addToCart('wooden-shelves-1')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/shelf-kitchen-utensils-ancient-russian-kitchen_372197-1439.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wooden Storage Unit</h3>
          <p>Price: ₹4,000</p>
          <button onClick={() => addToCart('wooden-storage-unit-2')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/pen-holder-shaped-like-miniature-desk-organizer_974629-213425.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Stacked Wooden Stand</h3>
          <p>Price: ₹3,000</p>
          <button onClick={() => addToCart('wooden-stand')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/handcrafted-wooden-decorative-vase_23-2151003070.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wooden Shelves</h3>
          <p>Price: ₹3,000</p>
          <button onClick={() => addToCart('wooden-shelves-2')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/view-modern-entryway-with-interior-designed-furniture_23-2150790920.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wooden Table</h3>
          <p>Price: ₹3,500</p>
          <button onClick={() => addToCart('wooden-table')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/flower-vase-table-against-orange-wall_1048944-7798355.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Kitchen Rack</h3>
          <p>Price: ₹2,800</p>
          <button onClick={() => addToCart('kitchen-rack')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/wooden-piece-furniture-interior_23-2148848665.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wooden Cabinet</h3>
          <p>Price: ₹4,500</p>
          <button onClick={() => addToCart('wooden-cabinet')}>Add to Cart</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeEssentials;
