import "../styles/Shop.css";
import { Search, User } from "lucide-react";
import Footer from "./Footer";
import productsData from "../Components/Shop.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Shop() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector(".header");

    const handleScroll = () => {
      if (!navbar) return;
      if (window.scrollY > lastScrollY) {
        navbar.classList.add("hide");
      } else {
        navbar.classList.remove("hide");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* Navbar */}
          <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
            <a href="/home" className="nav-link active">
              Home
            </a>
            <a href="/Living-Room" className="nav-link">
              Living Room
            </a>
            <a href="/Bedroom" className="nav-link">
              Bedroom
            </a>
            <a href="/Cabinetry" className="nav-link">
              Cabinetry
            </a>
            <a href="/Dining-and-Kitchen" className="nav-link">
              Dining & Kitchen
            </a>
            <a href="/Seating" className="nav-link">
              Seating
            </a>
            <a href="/Home-Essentials" className="nav-link">
              Home Essentials
            </a>
            <div className="icons-container">
              <User className="icon" onClick={handleUserClick} />
              <div className="cart-icon-container">
                <FaShoppingCart
                  className="cart-icon"
                  onClick={handlenavigate}
                />
                <span className="cart-badge">{cartCount}</span>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="shop-search-container">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="shop-search-icon" />
        </div>
      <div className="shop-product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="shop-product-card" key={product.id}>
              <img src={product.image} alt={product.alt} />
              <h3>{product.title}</h3>
              <p>
                <strong>Price: </strong>₹{product.price}
              </p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Shop;
