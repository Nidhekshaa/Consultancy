import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ResetPassword.css';
const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Password reset successful!");
      navigate('/login');
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        {msg && <p className="error-message">{msg}</p>}
        <input
          type="password"
          placeholder="New password"
          className="reset-password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="reset-password-button" type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
