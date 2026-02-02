import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/update.css";

export default function UpdateProduct() {
  const params = useParams();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  /* ===== Get Product Details ===== */
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5100/product/${params.id}`);
    result = await result.json();

    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  /* ===== Validation ===== */
  const validateProduct = () => {
    // const lettersRegex = /^[A-Za-z\s]+$/;
    const lettersRegex = /^[A-Za-z0-9\s]+$/;

    if (!name || !price || !category || !company)
      return "Please fill all product details";

    if (name.length < 2 || name.length > 25)
      return "Product name must be 2–15 characters";
    if (!lettersRegex.test(name))
      return "Product name must contain only letters";

    if (category.length < 2 || category.length > 20)
      return "Category must be 2–20 characters";
    if (!lettersRegex.test(category))
      return "Category must contain only letters";

    if (company.length < 2 || company.length > 20)
      return "Company must be 2–20 characters";
    if (!lettersRegex.test(company)) return "Company must contain only letters";

    if (isNaN(price) || Number(price) <= 0)
      return "Price must be a positive number";

    return null;
  };

  /* ===== Update Product ===== */
  const handleUpdate = async () => {
    const error = validateProduct();

    if (error) {
      setPopupMessage(`❌ ${error}`);
      setIsError(true);
      setShowPopup(true);
      return;
    }

    try {
      let result = await fetch(`http://localhost:5100/product/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, category, company }),
      });

      result = await result.json();

      if (result) {
        setPopupMessage("✅ Product Updated Successfully");
        setIsError(false);
        setShowPopup(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setPopupMessage("❌ Server error");
      setIsError(true);
      setShowPopup(true);
    }
  };

  return (
    <div className="addproduct">
      <h1>Update Product</h1>

      <input
        className="input-box"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />

      <input
        className="input-box"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Product Price"
      />

      <input
        className="input-box"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Product Category"
      />

      <input
        className="input-box"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Product Company"
      />

      <button className="addbutton" onClick={handleUpdate}>
        Update Product
      </button>

      {/* ===== POPUP ===== */}
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
