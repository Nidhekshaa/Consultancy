import React from "react";
import { Routes, Route } from "react-router-dom";

import Welcome from './pages/Welcome.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminLogin from "./Admin/AdminLogin.jsx";
import AdminDashborad from "./Admin/AdminDashborad.jsx";
import Orders from "./Admin/Orders.jsx";
import AddProduct from "./Admin/AddProduct.jsx";

import CartPage from './pages/CartPage.jsx';
import Shop from './pages/Shop.jsx';
import LivingRoom from "./pages/Living-Room.jsx";
import Bedroom from "./pages/Bedroom.jsx";
import Cabinetry from "./pages/Cabinetry.jsx";
import DiningAndKitchen from "./pages/DiningAndKitchen.jsx";
import Seating from "./pages/Seating.jsx";
import HomeEssentials from "./pages/HomeEssentials.jsx";

import Checkout from "./pages/Checkout.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ThankYouPage from "./pages/ThankyouPage.jsx";

import Profile from './pages/Profile.jsx';
import AboutUs from "./pages/About-Us";
import ContactUs from "./pages/Contact-Us";
import Customiseorderpolicy from "./pages/Customise-order-policy";
import App1 from "./App1.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/forgot-password" element={<App1 />} />

      {/* Admin */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashborad />} />
      <Route path="/add-product-dashboard" element={<AddProduct />} />
      <Route path="/orders-received" element={<Orders />} />

      {/* Products */}
      <Route path="/Living-Room" element={<LivingRoom />} />
      <Route path="/Bedroom" element={<Bedroom />} />
      <Route path="/Cabinetry" element={<Cabinetry />} />
      <Route path="/Dining-and-Kitchen" element={<DiningAndKitchen />} />
      <Route path="/Seating" element={<Seating />} />
      <Route path="/Home-Essentials" element={<HomeEssentials />} />
      <Route path="/shop" element={<Shop />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />

      <Route path="/About-us" element={<AboutUs />} />
      <Route path="/Contact-us" element={<ContactUs />} />
      <Route path="/Customise-order-policy" element={<Customiseorderpolicy />} />
    </Routes>
  );
}

export default App;
