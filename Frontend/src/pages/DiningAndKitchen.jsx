import "../styles/Styles.css";
import { Search, User, ShoppingBag } from "lucide-react";
import {  useNavigate  } from "react-router-dom";
import { useEffect , useState } from "react";

function DiningAndKitchen() {
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
          <a href="/home" >Home</a>
          <a href="/Living-Room">Living Room</a>
          <a href="/Bedroom">Bedroom</a>
          <a href="/Cabinetry">Cabinetry</a>
          <a href="/DiningAndKitchen" class="nav-link active">Dining & Kitchen</a>
          <a href="/Seating">Seating</a>
          <a href="/Home-Essentials">Home Essentials</a>
          <div className="icons-container">
          <User className="icon" onClick={handleUserClick} />
            <div className="cart-icon-container" >
            <ShoppingBag className="cart-icon" onClick={handlenavigate}/>
            <span className="cart-badge">0</span>
          </div>
          </div>
        </nav>
      </div>
    </header>
    <body>
      <div className="container">
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/restaurant-table-with-wooden-chairs-placed-hall-decorated-classical-style_140725-8460.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wood Dining</h3>
          <p>Price: ₹10,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/room-interior-design_23-2148899463.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Modern Dining</h3>
          <p>Price: ₹10,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/dining-set-table-chairs_933597-117.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Kitchen Storage with Dining</h3>
          <p>Price: ₹20,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-vector/modern-luxury-kitchen-dark-brown-cabinets-with-built-microwave-oven-realistic-side-view-image-vec_1284-15165.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Kitchen Unit</h3>
          <p>Price:  ₹25,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/table-chairs-front-modern-red-kitchen-furniture-with-kitchenware-interior-extreme-closeup-3d-rendering_476612-12956.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Table Set</h3>
          <p>Price: ₹8,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/photo-farmhouse-dining-room-furniture_933496-45976.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wood Shelf</h3>
          <p>Price: ₹25,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/dining-room-table-with-chairs-table-with-chairs-window-background_1239820-18948.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Dining Set</h3>
          <p>Price: ₹12,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/kitchen-interior-design-with-wooden-table_23-2148848661.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Kitchen Table</h3>
          <p>Price: ₹15,000</p>
          <button onclick="">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/free-photo/interior-design-house-modern-wooden-table-chair_657883-324.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid&w=740" alt="product" />
          <h3>Wood Cabinet</h3>
          <p>Price:  ₹18,000</p>
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
export default DiningAndKitchen;
