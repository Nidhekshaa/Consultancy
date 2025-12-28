import React, { useState } from "react";
import "../styles/AddProduct.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlus,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import config from "../config";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname; // default active

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${config.API_BASE_URL}/api/admin/add-product`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert("Product added Successfully");
      console.log(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handledashboard = () => {
    navigate("/admin-dashboard");
  };

  const handleproduct = () => {
    navigate("/add-product-dashboard");
  };

  const handleorders = () => {
    navigate("/orders-received");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="add-product-dashboard">
      <div className="add-product-dashboard-body">
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
              <FaPlus className="sidebar-icon" />
              Add Product
            </li>
            <li
              className={path === "/orders-received" ? "active-link" : ""}
              onClick={handleorders}
            >
              <FaClipboardList className="sidebar-icon" />
              Orders
            </li>
            <li onClick={handleLogout}>
              <FaSignOutAlt className="sidebar-icon" />
              Logout
            </li>
          </ul>
        </aside>

        <main className="add-product-container">
          <form className="add-product-form" onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="bedroom">Bedroom</option>
              <option value="cabinetry">Cabinetry</option>
              <option value="Dining-and-Kitchen">Dining and Kitchen</option>
              <option value="Seating">Seating</option>
              <option value="Living-Room">Living Room</option>
              <option value="HomeEssentials">HomeEssentials</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <button type="submit">Add Product</button>
            {message && <p className="error-message">{message}</p>}
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddProduct;
