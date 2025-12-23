import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed");

      }
  
      // ✅ Store token in localStorage if returned
      if (data.token) {
        localStorage.setItem("token", data.token);
        setSuccess("Registration successful! Redirecting to your profile...");
        setTimeout(() => navigate("/profile"), 2000); // Redirect to profile
      } else {
        setSuccess("Registration successful! Please login.");
        setTimeout(() => navigate("/login"), 2000); // Fallback to login
      }
  
    } catch (err) {
      setError(err.message);
    }
  };  

  return (
    <div className="register-contianer">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Register</h2>
        {error && <p >{error}</p>}
        {success && <p >{success}</p>}
        <input
          type="text"
          placeholder="Name"
          className="register-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button">
          Register
        </button>
        <p className="register-link">
        Already have an account? <a href="/login">Login</a>
        </p> 
      </form>
       
    </div>
  );
};

export default Register;