import React from "react";
import "../styles/Styles.css";
import { Search, User, ShoppingBag } from "lucide-react";

function Cabinetry() {
  return (
    <div className="App">
      <header className="header">
      <div className="header-content">
        <h2>Timber Mart</h2>
        <p>Making Your Home Into What You Want.</p>
        <nav className="navbar">
        <Search className="icon" onclick="" />
          <div className="icons-container">
            <User className="icon" onclick="" />
            <ShoppingBag className="icon" onclick="" />
          </div>
          <a href="/Living-Room">Living Room</a>
          <a href="/Bedroom">Bedroom</a>
          <a href="/Cabinetry">Cabinetry</a>
          <a href="/Dining-&-Kitchen">Dining & Kitchen</a>
          <a href="/Seating">Seating</a>
          <a href="/Home-Essentials">Home Essentials</a>
        </nav>
      </div>
    </header>
    <body>
      <div className="container">
        <div className="product-card">
          <img src="https://images.pexels.com/photos/7601371/pexels-photo-7601371.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Kitchen</h3>
          <p>Price: ₹90000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Closet</h3>
          <p>Price: ₹80000 </p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/19608773/pexels-photo-19608773/free-photo-of-interior-design-of-kitchen.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Cabinetry</h3>
          <p>Price: ₹1,00,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://media.istockphoto.com/id/157443190/photo/modern-kitchen-with-hardwood-cabinetry.jpg?s=1024x1024&w=is&k=20&c=-DbElmT_Mq6fdo8G05HxJWZIq3jIU2keNBMNDYj6Jf4=" alt="product" />
          <h3>Kitchen</h3>
          <p>Price: ₹60,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/7303768/pexels-photo-7303768.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Pantry</h3>
          <p>Price: ₹40,000 </p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/home-improvement-kitchen-remodel-view-installed_73110-916.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid" alt="product" />
          <h3>Storage</h3>
          <p>Price:  ₹25,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/mid-century-interior-design_23-2151902072.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid" alt="product" />
          <h3>Modular Kitchen</h3>
          <p>Price: ₹70,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/kitchen_632261-19643.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid" alt="product" />
          <h3>Classic Cabinets</h3>
          <p>Price: ₹77,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/render-3d-contemporary-kitchen_1048-18252.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid" alt="product" />
          <h3>Modern Wall Unit</h3>
          <p>Price: ₹90,000 </p>
          <button onclick="">Add to Cart</button>
        </div>
      </div>
    </body>
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
export default Cabinetry;
