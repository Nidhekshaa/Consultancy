import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminAuth.css";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [adminInfo, setAdminInfo] = useState(null);
  let navigate=useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      setAdminInfo(res.data);
      alert("Login successful!");
      navigate('/admin-dashboard');
      // You can redirect or store info in context/localStorage here
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="admin-auth-container">
      <form onSubmit={handleLogin} className="admin-auth-form">
        <h2>Admin Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>

        {adminInfo && (
          <div style={{ marginTop: "20px", color: "green" }}>
            <p>Welcome, {adminInfo.name}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
