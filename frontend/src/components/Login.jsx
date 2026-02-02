import React, { useEffect, useState } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  // 🔁 Already logged-in check
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  // 🔴 Popup helpers
  const showError = (message) => {
    setPopupMessage(message);
    setIsError(true);
    setShowPopup(true);
  };

  const showSuccess = (message) => {
    setPopupMessage(message);
    setIsError(false);
    setShowPopup(true);
  };

  // 🔍 Validation
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      showError("Email and Password are required");
      return false;
    }

    if (!emailRegex.test(email)) {
      showError("Invalid email format");
      return false;
    }

    if (password.length < 6) {
      showError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // 🟢 Login handler
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5100/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      // ✅ SUCCESS
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));

        showSuccess("✅ Login Successful");

        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/");
        }, 1200);
      }
      // ❌ INVALID CREDENTIALS
      else {
        showError("❌ Invalid Email or Password");
      }
    } catch (error) {
      showError("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />

      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />

      <button className="appbutton2" onClick={handleLogin}>
        Login
      </button>

      {/* 🔥 POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3 style={{ color: isError ? "red" : "green" }}>
              {popupMessage}
            </h3>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
