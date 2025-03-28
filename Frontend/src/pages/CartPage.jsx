import React, { useContext } from "react";
import { CartContext } from "../pages/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/payment"); // Navigate to Payment Page
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
