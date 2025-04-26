import React, { useState } from "react";
import "../styles/AddProduct.css";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt,FaPlus,FaTags,FaShoppingCart,} from "react-icons/fa";

const Category = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Category"); // default active

  const handledashboard = () => {
    setActiveItem("Dashboard");
    navigate("/admin-dashboard");
  };

  const handleproduct = () => {
    setActiveItem("Add Product");
    navigate("/add-product-dashboard");
  };

  const handlecategory = () => {
    setActiveItem("Category");
    navigate("/select-category");
  };

  const handleorders = () => {
    setActiveItem("Orders");
    navigate("/orders-received");
  };

  return (
    <div className="Category-dashboard">
      <div className="Category-body">
        <aside className="sidebar">
          <ul>
            <li
              className={activeItem === "Dashboard" ? "active-link" : ""}
              onClick={handledashboard}
            >
              <FaTachometerAlt className="sidebar-icon" />
              Dashboard
            </li>
            <li
              className={activeItem === "Add Product" ? "active-link" : ""}
              onClick={handleproduct}
            >
              <FaPlus className="sidebar-icon" />Add Product
            </li>
            <li
              className={activeItem === "Category" ? "active-link" : ""}
              onClick={handlecategory}
            >
              <FaTags className="sidebar-icon" />
              Category
            </li>
            <li
              className={activeItem === "Orders" ? "active-link" : ""}
              onClick={handleorders}
            >
              <FaShoppingCart className="sidebar-icon" />
              Orders
            </li>
          </ul>
        </aside>
        <main className="content">
          <h2>Select Category</h2>
          <div className="category-list">
            <div
              className="category-item"
              onClick={() => navigate("/Living-Room")}
            >
              <h3>Living Room</h3>
            </div>
            <div className="category-item" onClick={() => navigate("/Bedroom")}>
              <h3>Bedroom</h3>
            </div>
            <div
              className="category-item"
              onClick={() => navigate("/Cabinetry")}
            >
              <h3>Cabinetry</h3>
            </div>
            <div
              className="category-item"
              onClick={() => navigate("/Dining-&-Kitchen")}
            >
              <h3>Dining & Kitchen</h3>
            </div>
            <div className="category-item" onClick={() => navigate("/Seating")}>
              <h3>Seating</h3>
            </div>
            <div
              className="category-item"
              onClick={() => navigate("/Home-Essentials")}
            >
              <h3>Home Essentials</h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Category;
