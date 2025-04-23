import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CartPage from './pages/CartPage.jsx';

import LivingRoom from "./pages/Living-Room.jsx"
import Bedroom from "./pages/Bedroom.jsx"
import Cabinetry from "./pages/Cabinetry.jsx"
import DiningAndKitchen from "./pages/DiningAndKitchen.jsx"
import Seating from "./pages/Seating.jsx"
import HomeEssentials from "./pages/HomeEssentials.jsx"

import Checkout from "./pages/Checkout.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

import Profile from './pages/Profile.jsx';
import AboutUs from "./pages/About-Us";
import ContactUs from "./pages/Contact-Us";
import Customiseorderpolicy from "./pages/Customise-order-policy";
// import PaymentPage from "./pages/PaymentPage.jsx";

import App1 from "./App1.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/forgot-password" element={<App1 />} />
        {/* Product Pages */}
        <Route path="/Living-Room" element={<LivingRoom />} />
        <Route path="/Bedroom" element={<Bedroom />} />
        <Route path="/Cabinetry" element={<Cabinetry />} />
        <Route path="/Dining-&-Kitchen" element={<DiningAndKitchen />} />
        <Route path="/Seating" element={<Seating />} />
        <Route path="/Home-Essentials" element={<HomeEssentials />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<PaymentPage />} />
        
        <Route path="/About-us" element={<AboutUs />} />
        <Route path="/Contact-us" element={<ContactUs />} />
        <Route path="/Customise-order-policy" element={<Customiseorderpolicy />} />
      </Routes>
    </Router>
  );
}
export default App;
