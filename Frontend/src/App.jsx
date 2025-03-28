import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import AboutUs from "./pages/About-Us";
import ContactUs from "./pages/Contact-Us";
import Customiseorderpolicy from "./pages/Customise-order-policy";
// import CartPage from "./pages/CartPage.jsx";
// import PaymentPage from "./pages/PaymentPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/About-us" element={<AboutUs />} />
        <Route path="/Contact-us" element={<ContactUs />} />
        <Route path="/Customise-order-policy" element={<Customiseorderpolicy />} />
      </Routes>
    </Router>
  );
}
export default App;
