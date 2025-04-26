import "../styles/Home.css";
import { Search, User, ShoppingBag } from "lucide-react";
import Footer from "./Footer";
import productsData from "../Components/Home.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const Home = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [products] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [cartCount, setCartCount] = useState(cartItems.length);

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/profile" : "/register");
  };

  const handlenavigate = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/cart" : "/login");
  };

  useEffect(() => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchQuery, products]);

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
    alert("Product added to cart!");
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h2>Timber Mart</h2>
          <p>Making Your Home Into What You Want.</p>
          <nav className="navbar">
            <a href="/home" className="nav-link active">Home</a>
            <a href="/Living-Room" className="nav-link">Living Room</a>
            <a href="/Bedroom" className="nav-link">Bedroom</a>
            <a href="/Cabinetry" className="nav-link">Cabinetry</a>
            <a href="/Dining-&-Kitchen" className="nav-link">Dining & Kitchen</a>
            <a href="/Seating" className="nav-link">Seating</a>
            <a href="/Home-Essentials" className="nav-link">Home Essentials</a>
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

      <div className="container">
        <div className="hero-container">
          <img src="/heroImage.jpeg" alt="Handcrafted Luxury" className="hero-image" />
          <div className="hero-text">
            <h1>HANDCRAFTED LUXURY</h1>
            <p>TIMELESS PIECES THAT COMPLEMENT DAILY ROUTINES AND LAST GENERATIONS.</p>
            <a href="/shop" className="hero-button">Shop All</a>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="search-icon" />
        </div>

        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.alt} />
                <h3>{product.title}</h3>
                <p>₹{product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No matching products found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
