import "../styles/Home.css";
import { Search } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import productsData from "../Components/Home.json";
import { useState, useEffect } from "react";

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  
  useEffect(() => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchQuery, products]);
  
  const handleAddToCart = (product) => {
    alert("Product added to cart!");
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Filter products whenever searchQuery changes
  useEffect(() => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchQuery]);

  return (
    <div className="App">
      <Header cartCount={cartItems.length} />

      <div className="container">
        <div className="hero-container">
          <img
            src="/heroImage.jpeg"
            alt="Handcrafted Luxury"
            className="hero-image"
          />
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
                <div>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
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
