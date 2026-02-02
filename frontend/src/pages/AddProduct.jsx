import React, { useState } from "react";
import "../Styles/add-product.css";

export default function AddProduct() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const [products, setProducts] = useState([]); // Product list

// Simple Validation
 const validateProduct = () => {
  const lettersRegex = /^[A-Za-z\s]+$/;

  // 1️⃣ Check empty fields
  if (!name || !price || !category || !company) return "Please fill Product details";


  // 2️⃣ Name validation
  if (name.length < 2 || name.length > 15) 
    return "Product name must be 2-15 characters long";
  if (!lettersRegex.test(name)) 
    return "Product name must contain only letters";

  // 3️⃣ Category validation
  if (category.length < 2 || category.length > 20) 
    return "Category must be 2-20 characters long";
  if (!lettersRegex.test(category)) 
    return "Category must contain only letters";

  // 4️⃣ Company validation
  if (company.length < 2 || company.length > 20) 
    return "Company must be 2-20 characters long";
  if (!lettersRegex.test(company)) 
    return "Company must contain only letters";

  // 5️⃣ Price validation
  if (isNaN(price) || Number(price) <= 0) 
    return "Price must be a positive number";

  return null; // all good
};

  const handleProduct = async () => {
    console.warn(name, price, category, company);

    // 1️⃣ Run validation
    const error = validateProduct();
    if (error) {
      setPopupMessage(`❌ ${error}`);
      setIsError(true);
      setShowPopup(true);
      return; // stop execution if validation fails
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    try {
      const response = await fetch("http://localhost:5100/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, category, company, userId }),
      });

      const result = await response.json();
      console.warn(result);

      if (response.ok) {
        // ✅ Success popup
        setPopupMessage("✅ Product Added Successfully");
        setIsError(false);
        setShowPopup(true);

        // Add product to local list
        setProducts([...products, { name, price, category, company }]);

        // Clear input fields
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
      } else {
        // ❌ Server error popup
        setPopupMessage(result.message || "❌ Add product failed");
        setIsError(true);
        setShowPopup(true);
      }
    } catch (error) {
      console.error(error);
      setPopupMessage("❌ Server error");
      setIsError(true);
      setShowPopup(true);
    }
  };

  return (
    <div className="addproduct">
      <h1>Add Product</h1>

      <input
        className="input-box"
        type="text"
        placeholder="Enter Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="Enter Product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="Enter Product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="Enter Product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button className="addbutton" onClick={handleProduct}>
        Add Product
      </button>

      {/* Success / Error Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3 style={{ color: isError ? "red" : "green" }}>{popupMessage}</h3>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
