import React from 'react';
import '../styles/Styles.css';
import { Search, User, ShoppingBag } from "lucide-react";
import {  useNavigate  } from "react-router-dom";
import { useEffect , useState } from "react";
function Seating() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
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
          {/* <Search className="icon" onclick="" /> */}
            
            <nav className="navbar">
            <a href="/" class="nav-link">Home</a>
              <a href="/Living-Room" class="nav-link">Living Room</a>
              <a href="/Bedroom" class="nav-link">Bedroom</a>
              <a href="/Cabinetry"class="nav-link">Cabinetry</a>
              <a href="/Dining-&-Kitchen" class="nav-link">Dining & Kitchen</a>
              <a href="/Seating" class="nav-link active">Seating</a>
              <a href="/Home-Essentials" class="nav-link">Home Essentials</a>
          <div className="icons-container">
          <User className="icon" onClick={handleUserClick} />
            <div className="cart-icon-container" >
            <ShoppingBag className="cart-icon" onClick={handlenavigate}/>
            <span className="cart-badge">0</span>
          </div>
            </div>
            </nav>
          </nav>
        </div>
      </header>
  
      <div className="container">
          <div className="product-card">
<<<<<<< HEAD
            <img src="data:image/jpeg;base64,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" alt="product" />
            <h3>Wooden Chair</h3>
            <p>Price: $6,000</p>
=======
            <img src="https://img.freepik.com/free-photo/table-setting-dinner_74190-2126.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Relaxation Set</h3>
            <p>Price: ₹5,000</p>
>>>>>>> a49cbadf39bdc22c73b5d5f67935aa774ae012cf
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
          </div>
          <div className="product-card">
<<<<<<< HEAD
            <img src="https://img.freepik.com/free-photo/grey-comfortable-armchair-isolated-white-background_181624-25295.jpg?semt=ais_hybrid&w=740" alt="product" />
            <h3>Unique Wooden Chair</h3>
            <p>Price: $10,999</p>
=======
            <img src="https://img.freepik.com/premium-photo/furniture-set_981168-1852.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Living Room Set</h3>
            <p>Price: ₹8,000</p>
>>>>>>> a49cbadf39bdc22c73b5d5f67935aa774ae012cf
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
          </div>
          <div className="product-card">
<<<<<<< HEAD
            <img src="https://img.freepik.com/free-vector/red-vintage-armchair-realistic-style_1441-760.jpg?semt=ais_hybrid&w=740" alt="product" />
            <h3>Classic Wooden Sofa</h3>
            <p>Price: $15,990</p>
=======
            <img src="https://img.freepik.com/premium-photo/room-with-couch-chairs-it_861622-343.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Outdoor Seating Set</h3>
            <p>Price: ₹9,000</p>
>>>>>>> a49cbadf39bdc22c73b5d5f67935aa774ae012cf
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
          </div>
          <div className="product-card">
            <img src="https://img.freepik.com/free-photo/empty-sofa-chair_1203-3499.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Armchair Set</h3>
            <p>Price: ₹3,000</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
          </div>
          <div className="product-card">
            <img src="https://img.freepik.com/premium-photo/high-angle-view-empty-chairs-table_1048944-19229876.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Wooden Sofa Set</h3>
            <p>Price: ₹7,500</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
          </div>
          <div className="product-card">
            <img src="https://img.freepik.com/premium-photo/isolated-wooden-bench-with-storage-functional-furniture-piece_1118550-3568.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Wooden Bench</h3>
            <p>Price: ₹3,500</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
          </div>
          <div className="product-card">
            <img src="https://img.freepik.com/premium-photo/empty-chairs-table-against-wall_1048944-10094300.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Sofa Set</h3>
            <p>Price: ₹9,500</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
          </div>
          <div className="product-card">
            <img src="https://img.freepik.com/premium-photo/close-up-empty-chair_1048944-11408983.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Wooden Bench</h3>
            <p>Price: ₹3,700</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
  
          </div>
          <div className="product-card">
            <img src="https://img.freepik.com/premium-photo/empty-chairs-tables-against-wall-home_1048944-12313784.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
            <h3>Hall set</h3>
            <p>Price: ₹7,600</p>
            <button onClick={() => addToCart('productId')}>Add to Cart</button>
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
export default Seating;