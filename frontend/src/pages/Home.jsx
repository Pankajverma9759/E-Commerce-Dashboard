import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  useEffect(() => {
    getProducts();
  }, []);
  
  const getProducts = async () => {
    let result = await fetch("http://localhost:5100/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5100/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();

    if (result) {
      setPopupMsg("✅ Product Deleted Successfully");
      setShowPopup(true);
      getProducts();
    }
  };

  const searchProduct = async (key) => {
    setSearchKey(key);

    if (!key) {
      getProducts();
      return;
    }

    let result = await fetch(`http://localhost:5100/search/${key}`);
    result = await result.json();
    setProducts(result);
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search your product"
          value={searchKey}
          onChange={(e) => searchProduct(e.target.value)}
        />
      </div>

      <div className="table">
        {/* Table Header */}
        <div className="table-head">
          <span>S.No</span>
          <span>Name</span>
          <span>Price</span>
          <span>Category</span>
          <span>Action</span>
        </div>

        {/* Table Rows */}
        {products.length > 0 ? (
          products.map((item, index) => (
            <div className="table-row" key={item._id}>
              <span>{index + 1}</span>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <span>{item.category}</span>

              {/* Action Buttons */}
              <span className="action-btns">
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(item._id)}
                >
                  Delete
                </button>

                <Link className="update-btn" to={"/update/" + item._id}>
                  Update
                </Link>
              </span>
            </div>
          ))
        ) : (
          <h1>No Found!!!</h1>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMsg}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
