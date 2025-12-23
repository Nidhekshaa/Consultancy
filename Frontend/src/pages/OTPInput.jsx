import React, { useState, useContext, useRef, useEffect } from "react";
import { RecoveryContext } from "../App1";
import axios from "axios";
import "../styles/OTPInput.css";

export default function OTPInput() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const inputRefs = useRef([]);
  const API_URL = process.env.REACT_APP_API_URL;
  
  function resendOTP() {
    if (disable) return;

    axios
      .post(`${API_URL}/send_recovery_email`, {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => {
        setDisable(true);
        alert("A new OTP has successfully been sent to your email.");
        setTimer(60);
      })
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("resetpassword");
    } else {
      alert("The code you have entered is not correct, try again or re-send the link");
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount > 0 ? lastTimerCount - 1 : lastTimerCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="otp-container">
      <div className="card-box">
        <div className="inner-layout">
          <div className="otp-title">
            <div className="title-text">
              <p>Email Verification</p>
            </div>
            <div className="subtitle-text">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <form>
            <div className="form-layout">
              <div className="form-input-container">
                {OTPinput.map((val, index) => (
                  <div className="input-wrapper" key={index}>
                    <input
                      maxLength="1"
                      className="otp-input-box"
                      type="text"
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={OTPinput[index]}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!/^[0-9]?$/.test(value)) return;

                        const newOTP = [...OTPinput];
                        newOTP[index] = value;
                        setOTPinput(newOTP);

                        if (value && index < inputRefs.current.length - 1) {
                          inputRefs.current[index + 1].focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !OTPinput[index] && index > 0) {
                          inputRefs.current[index - 1].focus();
                        }
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="verify-actions">
                <div>
                  <a onClick={verifyOTP} className="verify-button">
                    Verify Account
                  </a>
                </div>

                <div className="resend-section">
                  <p>Didn't receive code?</p>
                  <a
                    className={`resend-link ${disable ? "disabled" : ""}`}
                    onClick={resendOTP}
                  >
                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
