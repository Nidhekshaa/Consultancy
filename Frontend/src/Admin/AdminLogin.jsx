import React, { useState } from "react";
import "../styles/AdminAuth.css";
import { useNavigate } from "react-router-dom";
import config from "../config";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${config.API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // First check if it's actually JSON before parsing
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON but received something else");
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/orders-received");
      } else {
        setError("Token not received from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error or server issue. Please try again later.");
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
      </form>
    </div>
  );
};

export default AdminLogin;
