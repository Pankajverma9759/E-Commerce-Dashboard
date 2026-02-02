import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(storedUser?.name || "");
  const [email, setEmail] = useState(storedUser?.email || "");

  // Logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ✅ Update profile (DATABASE + localStorage)
  const updateProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:5100/update-profile/${storedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // update localStorage with fresh data
        localStorage.setItem("user", JSON.stringify(result));

        alert("Profile Updated Successfully ✅");
      } else {
        alert(result.message || "Update failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  if (!storedUser) {
    return <h2>Please login first</h2>;
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>

      <input
        type="text"
        className="inputBox1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Update Name"
      />

      <input
        type="email"
        className="inputBox1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Update Email"
      />

      <div style={{ marginTop: "20px" }}>
        <button className="appbutton" onClick={updateProfile}>
          Update Profile
        </button>

        <button
          className="appbutton"
          style={{ marginLeft: "10px", background: "red" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
