import "../styles/Styles.css";
import { Search, User, ShoppingBag } from "lucide-react";
import {  useNavigate  } from "react-router-dom";
import { useEffect , useState } from "react";

function LivingRoom() {
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
            <a href="/Living-Room" class="nav-link active">Living Room</a>
            <a href="/Bedroom" class="nav-link">Bedroom</a>
            <a href="/Cabinetry"class="nav-link">Cabinetry</a>
            <a href="/Dining-&-Kitchen" class="nav-link">Dining & Kitchen</a>
            <a href="/Seating" class="nav-link">Seating</a>
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
          <img src="https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Dining Set</h3>
          <p>Price: ₹10,000</p>
          <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/17219549/pexels-photo-17219549/free-photo-of-a-dining-room-in-modern-design.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Dining Set</h3>
          <p>Price: ₹20,000</p>
          <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/7303672/pexels-photo-7303672.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Storage Unit</h3>
          <p>Price: ₹20,000</p>
          <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://img.freepik.com/premium-photo/minsk-belarus-august-2020-interior-modern-luxure-guest-room-studio-apartments-with-sofa-tv_97694-10830.jpg?ga=GA1.1.946617581.1714549414&semt=ais_hybrid" alt="product" />
          <h3>Hall set</h3>
          <p>Price:  ₹35,000</p>
          <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/11262212/pexels-photo-11262212.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Table Set</h3>
          <p>Price: ₹30,000</p>
          <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/10507487/pexels-photo-10507487.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Wall Shelf</h3>
          <p>Price: ₹15,000</p>
          <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Chest Set</h3>
          <p>Price: ₹25,000</p>
          <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/7563521/pexels-photo-7563521.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Working Table</h3>
          <p>Price: ₹30,000</p>
          <button onClick={() => addToCart('productId')}>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://images.pexels.com/photos/7486484/pexels-photo-7486484.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" />
          <h3>Storage Unit</h3>
          <p>Price:  ₹35,000</p>
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
export default LivingRoom;
