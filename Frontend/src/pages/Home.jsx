import "../styles/Home.css";
import { Search, User } from "lucide-react";
import Footer from "./Footer";
import productsData from "../Components/Home.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const Home = () => {
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

  const images = [
    "/heroImage1.jpeg",
    "/heroImage2.jpeg",
    "/heroImage3.jpeg",
    "/heroImage4.jpeg",
  ]; // Add your image paths
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  const features = [
    {
      img: "/guaranteed.jpeg", // Replace with actual image path or use React Icons
      title: "Damage Covered",
      description: (
        <>
          Be assured. Your order is in <strong>safe hands</strong>. We provide
          replacement on damaged items.
        </>
      ),
    },
    {
      img: "/genuine.jpeg",
      title: "100% Genuine Products",
      description: (
        <>
          We manufacture 100% Genuine <strong>Solid Wood</strong> Furniture
          because its durable and have long life.
        </>
      ),
    },
    {
      img: "/delivery.jpeg",
      title: "Secure Delivery",
      description: (
        <>
          Your orders are handled with utmost care. We ensure{" "}
          <strong>secure delivery</strong> for every purchase you make.
        </>
      ),
    },
  ];

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h2>Timber Mart</h2>
          <p>Making Your Home Into What You Want.</p>
          <nav className="navbar">
            <div
              className="hamburger"
              onClick={() => {
                document.querySelector(".nav-links").classList.toggle("open");
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="nav-links">
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
            </div>

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

      <div className="container">
        <div className="hero-container">
          <img
            src={images[currentIndex]}
            alt="Handcrafted Luxury"
            className="hero-image"
          />
          <div className="hero-text">
            <h1>HANDCRAFTED LUXURY</h1>
            <p>
              TIMELESS PIECES THAT COMPLEMENT DAILY ROUTINES AND LAST
              GENERATIONS.
            </p>
            <a href="/shop" className="hero-button">
              Shop All
            </a>
          </div>
        </div>
      </div>

      <div class="collection-section">
        <h2>Our Collection</h2>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.alt} />
              <h3>{product.title}</h3>
              <p>
                <strong>Price: </strong>₹{product.price}
              </p>
            </div>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>

      <div className="made-to-order-text">
        <h2 className="made-to-order-title">Made In India</h2>
        <p className="made-to-order-description">
          Dedicated to Solid Wood Furniture. We create quality products that
          embody craftsmanship, enrich lives, and connect generations.
        </p>
      </div>

      <div>
        <div class="collection-section">
          <h2>New Arrivals</h2>
        </div>
        <div className="special-products">
          <div className="product-card">
            <img src="images/new1.jpeg" alt="Product 3" />
            <h4>Wooden chair</h4>
            <p>
              <strong>Price: </strong>₹88,000
            </p>
          </div>
          <div className="product-card">
            <img src="images/new2.jpeg" alt="Product 4" />
            <h4>Kitchen shelf</h4>
            <p>
              <strong>Price: </strong>₹3,999
            </p>
          </div>
          <div className="product-card">
            <img src="images/new3.jpeg" alt="Product 4" />
            <h4>Sofa</h4>
            <p>
              <strong>Price: </strong>₹7,900
            </p>
          </div>
        </div>
      </div>

      <div className="made-to-order-container">
        {/* Left: Image */}
        <div className="made-to-order-image">
          <img src="/Carpenter.jpeg" alt="Made To Order" />
        </div>

        {/* Right: Text Content */}
        <div className="made-to-order-text">
          <h2 className="made-to-order-title">Made To Order</h2>
          <p className="made-to-order-description">
            Dream it and we'll bring it to life for you. Want the perfect coffee
            table or sofa, made <em>just for you?</em>
          </p>
          <p className="made-to-order-details">
            With custom design and detailed craftsmanship, we can craft a
            bespoke piece, exactly the way you want it.
          </p>
          <button className="consult-button">Consult With Our Designer</button>
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919865669444"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          <img
            src="/whatsapp-icon.png"
            alt="WhatsApp"
            className="whatsapp-icon"
          />
          <span>Chat with Experts</span>
        </a>
      </div>
      <div>
        <div class="collection-section">
          <h2>Our Special</h2>
        </div>
        <div className="special-products">
          <div className="product-card">
            <img src="images/b4.webp" alt="Product 1" />
            <h4>Luxury bed</h4>
            <p>
              <strong>Price: </strong>₹10.00
            </p>
          </div>
          <div className="product-card">
            <img src="images/l9.jpeg" alt="Product 2" />
            <h4>wooden Self</h4>
            <p>
              <strong>Price: </strong>₹20.00
            </p>
          </div>
          <div className="product-card">
            <img src="images/s3.avif" alt="Product 3" />
            <h4>Wooden chair</h4>
            <p>
              <strong>Price: </strong>₹30.00
            </p>
          </div>
          <div className="product-card">
            <img src="images/c2.webp" alt="Product 4" />
            <h4>Kitchen shelf</h4>
            <p>
              <strong>Price: </strong>₹40.00
            </p>
          </div>
          <div className="product-card">
            <img src="images/h3.jpeg" alt="Product 4" />
            <h4>Sofa</h4>
            <p>
              <strong>Price: </strong>₹40.00
            </p>
          </div>
        </div>
      </div>
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.img} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
