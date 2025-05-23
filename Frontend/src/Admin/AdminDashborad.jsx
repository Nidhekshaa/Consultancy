import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AdminDashboard.css";
import {
  FaTachometerAlt,
  FaPlus,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const handleDashboard = () => {
    navigate("/admin-dashboard");
  };

  const handleProduct = () => {
    navigate("/add-product-dashboard");
  };

  const handleOrders = () => {
    navigate("/orders-received");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [orders, setOrders] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    fetch("https://consultancy-4drr.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to fetch orders:", err));

    fetch("https://consultancy-4drr.onrender.com/category-stats")
      .then((res) => res.json())
      .then((data) => setCategoryStats(data))
      .catch((err) => console.error("Failed to fetch category stats:", err));
  }, []);

  const totalOrders = orders.length;
  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const completedCount = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const pendingPercent = totalOrders
    ? ((pendingCount / totalOrders) * 100).toFixed(2)
    : 0;
  const completedPercent = totalOrders
    ? ((completedCount / totalOrders) * 100).toFixed(2)
    : 0;

  const orderData = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        label: "Order Status (%)",
        data: [pendingPercent, completedPercent],
        backgroundColor: ["#f87171", "#4ade80"],
      },
    ],
  };

  const orderOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const categoryData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        data: Object.values(categoryStats),
        backgroundColor: [
          "#60a5fa",
          "#fbbf24",
          "#34d399",
          "#f472b6",
          "#a78bfa",
          "#fca5a1",
        ],
      },
    ],
  };

  {
    orders.map((order, index) => {
      if (!order._id) return null;
      const orderId = order._id;
      const orderStatus = order.status;
    });
  }

  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>Welcome To Timber Mart</h1>
      </header>
      <div className="admin-dashboard-body">
        <aside className="sidebar">
          <ul>
            <li
              className={path === "/admin-dashboard" ? "active-link" : ""}
              onClick={handleDashboard}
            >
              <FaTachometerAlt className="sidebar-icon" />
              Dashboard
            </li>
            <li
              className={path === "/add-product-dashboard" ? "active-link" : ""}
              onClick={handleProduct}
            >
              <FaPlus className="sidebar-icon" />
              Add Product
            </li>

            <li
              className={path === "/orders-received" ? "active-link" : ""}
              onClick={handleOrders}
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
        <main className="dashboard-main">
          <h2>Admin Overview</h2>
          <div className="charts-container">
            <div className="chart-box">
              <h3>Items per Category</h3>
              <Pie data={categoryData} />
            </div>
            {/* <div className="chart-box">
              <h3>Order Status</h3>
              <Bar data={orderData} options={orderOptions} />
            </div> */}
          </div>
          <h2>Our Special</h2>
          <div className="admin-special-products">
            <div className="product-card">
              <img src="images/b4.webp" alt="Product 1" />
              <h4>Luxury bed</h4>
              <p>
                <strong>Price: </strong>₹10000.00
              </p>
            </div>
            <div className="product-card">
              <img src="images/l9.jpeg" alt="Product 2" />
              <h4>wooden Self</h4>
              <p>
                <strong>Price: </strong>₹20000.00
              </p>
            </div>
            <div className="product-card">
              <img src="images/s3.avif" alt="Product 3" />
              <h4>Wooden chair</h4>
              <p>
                <strong>Price: </strong>₹30000.00
              </p>
            </div>
            <div className="product-card">
              <img src="images/c2.webp" alt="Product 4" />
              <h4>Kitchen shelf</h4>
              <p>
                <strong>Price: </strong>₹40000.00
              </p>
            </div>
            <div className="product-card">
              <img src="images/h3.jpeg" alt="Product 4" />
              <h4>Sofa</h4>
              <p>
                <strong>Price: </strong>₹40000.00
              </p>
            </div>
          </div>
        </main>
      </div>
      <footer>
        <p>&copy; 2023 Timber Mart. All rights reserved.</p>
        <p>Contact: 9412345678</p>
        <p>Email: timber@gmail.com </p>
        <p>Address: 123 Timber Lane, Wood City</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
