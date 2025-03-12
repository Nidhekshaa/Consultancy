import React from "react";
import "../styles/Styles.css";

function Customiseorderpolicy() {
  return (
    <div className="App">
      <header className="header">
      <div className="header-content">
        <h2>Timber Mart</h2>
        <p>Making Your Home Into What You Want.</p>
        <nav className="navbar">
          <a href="/Living-Room">Living Room</a>
          <a href="/Bedroom">Bedroom</a>
          <a href="/Cabinetry">Cabinetry</a>
          <a href="/Dining-&-Kitchen">Dining & Kitchen</a>
          <a href="/Seating">Seating</a>
          <a href="/Home-Essentials">Home Essentials</a>
        </nav>
      </div>
    </header>
    <body className="order-policy">
    <div>
        <h1>Customer Order Policy</h1>
        <p>A customised product is a product that is made according to specific requirements or preferences of the customer. 
           It is tailored to meet the unique needs of an individual or group of individuals. 
           A customised product can be modified in terms of design, colour, size, features, or any other aspect that the customer requires. 
           Customised products are often more expensive than standard products due to the additional time and effort involved in their production. 
           The product which is not mentioned on our platform/website will be considered as Customised order.</p>
        <p>Terms and Conditions for customise order;</p>
        <li>The word "customised" itself specifies that the product is only manufactured/designed on behalf of the customer himself/herself. Once the order details are confirmed, at the very same time manufacturing for the product will get started, hence it cannot be canceled and payment cannot be reversed.</li>
        <li>Payment for customise order will be fully advance, just like other orders. The payment for customise orders will be non-refundable in any case since we started manufacturing of the product immediately after receiving the payment.</li>
        <li>As customised orders are something that are not manufactured on regular basis just like other products which have fixed parameters. It can take up to 7-8 weeks of time to dispatch it from our premises. If in any other circumstances the order is getting delayed, our company customer executive will update you regarding the delay. We always strive to deliver the best quality products, and for that, we require sufficient time to make the necessary changes as per the customer's requirements. Company is not liable to share each and every step/details of manufacturing process after the order details have been confirmed by the customer.</li>
        <li>Once the order is confirmed and the payment is initiated there will be no changes in the order.</li>
        <p>Every order, whether it is a regular order or a customised order, is important to us. We take pride in our craftsmanship and make each and every order from scratch.</p>
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
export default Customiseorderpolicy;
