import React, { useState, useEffect } from "react";
import "../Styles/Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

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

  // 🔴 REGEX VALIDATION
  const validate = () => {
    const nameRegex = /^[A-Za-z ]{1,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;

    // ❌ Empty check (MOST IMPORTANT)
    if (!name || !email || !password) {
      showError("All fields are mandatory");
      return false;
    }

    if (!nameRegex.test(name)) {
      showError("Name must contain only letters (max 15 characters)");
      return false;
    }

    if (!emailRegex.test(email)) {
      showError("Invalid email format");
      return false;
    }

    if (!passwordRegex.test(password)) {
      showError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // 🟢 Register
  const collectData = async () => {
    if (!validate()) return;

    try {
      let response = await fetch("http://localhost:5100/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      
      if (!response.ok) {
        showError(result.message || "Registration failed");
        return;
      }

      //localStorage.setItem("user", JSON.stringify(result.result));
      //localStorage.setItem("token", JSON.stringify(result.auth));


      showSuccess("✅ Registered Successfully, Please Login");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      showError("Server error. Try again later.");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>

      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />

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

      <button className="appbutton1" onClick={collectData}>
        Register
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
