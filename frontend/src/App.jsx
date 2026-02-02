import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateComponent from "./components/PrivateComponent";
import './App.css';
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
  
      <Routes>
          <Route element={<PrivateComponent/>}>
            <Route path="/" element={<Home />}/>
            <Route  path="/add" element={<AddProduct/>}/>
            <Route  path="/update/:id" element={<UpdateProduct />}/>
            <Route  path="/profile" element={<Profile/>}/>
          </Route>
          
            <Route  path="/register" element={<Register/>}/>
            <Route  path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
       <Footer />
    </div>
  );
}

export default App;
