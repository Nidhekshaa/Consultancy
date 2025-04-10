import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
        setError("Both fields are required");
        return;
    }

    console.log("🔹 Sending login request with:", { email, password });

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json(); // ✅ Parse JSON response first
  
      if (!response.ok) {
          throw new Error(data.error || "Login failed");
      }
      localStorage.setItem("token", data.token);
      alert(data.message); // ✅ Show the success message
      navigate("/profile");
  } catch (err) {
      console.error("❌ Login error:", err.message);
      setError(err.message);
  }  
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-container">
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
        <button className="login-button">Login</button>
        <p className="login-link">
        Don't have an Account? <a href="/register">Register</a>
        </p> 
      </form>
    </div>
  );
};

export default Login;