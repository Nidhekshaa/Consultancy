import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CartPage.css'; 

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem('token'); // Assuming token is stored here

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCartItems(res.data.products);

        // Fetch all product details
        const productRes = await axios.get('http://localhost:5000/products');
        setProducts(productRes.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [token]);

  useEffect(() => {
    const totalCost = cartItems.reduce((acc, item) => {
      const product = products.find(p => p._id === item.productId);
      return product ? acc + product.price * item.quantity : acc;
    }, 0);
    setTotal(totalCost);
  }, [cartItems, products]);

  const getProductDetails = (id) => products.find(p => p._id === id);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map(item => {
            const product = getProductDetails(item.productId);
            return (
              <li key={item.productId} className="cart-item">
                <div>
                  <h4>{product?.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{product?.price}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="cart-total">
        <h3>Total: ₹{total}</h3>
      </div>
    </div>
  );
};

export default CartPage;
