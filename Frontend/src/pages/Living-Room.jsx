import "../styles/Styles.css";
import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { FaShoppingCart } from "react-icons/fa";

function LivingRoom() {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartCount, setCartCount] = useState(cartItems.length);

  useEffect(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (minPrice !== "" && maxPrice !== "") {
      result = result.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, minPrice, maxPrice, products]);

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/profile" : "/register");
  };

  const handlenavigate = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/cart" : "/login");
  };

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch products initially
    fetch(`https://consultancy-2-eavm.onrender.com/products?category=Living-Room`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
        setFilteredProducts(data); // initialize filteredProducts also
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    // Update filtered products when searchQuery changes
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchQuery, products]);

  const handleAddToCart = (product) => {
    const productForCart = {
      id: product._id,
      title: product.name,
      image: `https://consultancy-2-eavm.onrender.com/${product.image}`,
      price: product.price,
      quantity: 1,
    };

    const updatedCart = [...cartItems, productForCart];
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
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/Living-Room" className="nav-link active">Living Room</Link>
              <Link to="/Bedroom" className="nav-link">Bedroom</Link>
              <Link to="/Cabinetry" className="nav-link">Cabinetry</Link>
              <Link to="/Dining-and-Kitchen" className="nav-link">Dining & Kitchen</Link>
              <Link to="/Seating" className="nav-link">Seating</Link>
              <Link to="/Home-Essentials" className="nav-link">Home Essentials</Link>
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

      <div className="search-filter-wrapper">
        <div className="price-filter">
          <label>Min Price:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
          />
          <label>Max Price:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="1,00,000"
          />
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
      </div>

      <div className="container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={`https://consultancy-2-eavm.onrender.com/${product.image.replace(/\\/g, "/")}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
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

export default LivingRoom;
