import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AdminDashboard.css";
import Home from "../pages/Home";
import { FaTachometerAlt,FaPlus,FaTags,FaShoppingCart,} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const handledashboard = () => {
    navigate("/admin-dashboard");
  };

  const handleproduct = () => {
    navigate("/add-product-dashboard");
  };

  const handlecategory = () => {
    navigate("/select-category");
  };

  const handleorders = () => {
    navigate("/orders-received");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-body">
        <aside className="sidebar">
          <ul>
            <li
              className={path === "/admin-dashboard" ? "active-link" : ""}
              onClick={handledashboard}
            >
              <FaTachometerAlt className="sidebar-icon" />
              Dashboard
            </li>
            <li
              className={path === "/add-product-dashboard" ? "active-link" : ""}
              onClick={handleproduct}
            >
              <FaPlus className="sidebar-icon" />Add Product
            </li>
            <li
              className={path === "/select-category" ? "active-link" : ""}
              onClick={handlecategory}
            >
              <FaTags className="sidebar-icon" />
              Category
            </li>
            <li
              className={path === "/orders-received" ? "active-link" : ""}
              onClick={handleorders}
            >
              <FaShoppingCart className="sidebar-icon" />
              Orders
            </li>
          </ul>
        </aside>
        <Home />
      </div>
    </div>
  );
};

export default AdminDashboard;
