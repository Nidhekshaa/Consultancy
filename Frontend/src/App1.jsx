import { useState, createContext } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import OTPInput from "./pages/OTPInput";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import "./App1.css";

export const RecoveryContext = createContext();

function App1() {
  const [page, setPage] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const NavigateComponents = () => {
    
    if (page === "otp") return <OTPInput />;
    if (page === "resetpassword") return <ResetPassword />;
    if (page === "login") return <Login />;

    return <ForgotPassword/>;
  };

  return (
    <RecoveryContext.Provider value={{ page, setPage, email, setEmail, otp, setOTP }}>
      <div className="container">
        {NavigateComponents()}
      </div>
    </RecoveryContext.Provider>
  );
}

export default App1;
