import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ThankYouPage.css"; // Optional CSS file

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h1>🎉 Thank You!</h1>
        <p>Your payment was successful.</p>
        <p>We appreciate your business and hope to serve you again soon.</p>
        <button onClick={handleBackToHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default ThankYouPage;
