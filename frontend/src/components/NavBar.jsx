
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";
import logo from "../assets/logo.jpeg";

export default function NavBar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/register");
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Profile" className="logo-set" />

      {/* ☰ Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu */}
      <ul className={`nav-ul ${menuOpen ? "active" : ""}`}>
        {auth ? (
          <>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/">Products</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/add">Add Product</Link>
            </li>
            {/* <li onClick={() => setMenuOpen(false)}>
              <Link to="/update">Update Product</Link>
            </li> */}
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/profile">Profile</Link>
            </li>
            {/* <li>
              <Link onClick={logout}>Logout</Link>
            </li> */}
          </>
        ) : (
          <>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/register">Register</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
