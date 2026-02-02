const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-dashboard';

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());



// Test Route
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

// ================= REGISTER API =================
app.post("/register", async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    // 🔴 Empty check (backend safety)
    if (!name || !email || !password) {
      return resp.status(400).json({
        message: "All fields are required",
      });
    }

    // 🔴 Duplicate email check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return resp.status(400).json({
        message: "Email already registered",
      });
    }

    let user = new User({ name, email, password });
    let result = await user.save();

    result = result.toObject();
    delete result.password;

    resp.status(201).json(result);
  } catch (error) {
    resp.status(500).json({
      message: "Server error",
    });
  }
});

// ================= LOGIN API =================
app.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return resp.status(400).json({
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email, password }).select("-password");

    if (!user) {
      return resp.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    Jwt.sign(
      { user },
      jwtKey,
      { expiresIn: "2h" },   // ✅ FIXED
      (err, token) => {
        if (err) {
          return resp.status(500).json({
            message: "Token generation failed",
          });
        }

        resp.status(200).json({
          user,
          auth: token,       // ✅ TOKEN AAYEGA
        });
      }
    );
  } catch (error) {
    resp.status(500).json({
      message: "Server error",
    });
  }
});


// ================= UPDATE PROFILE =================
app.put("/update-profile/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// ================= ADD PRODUCT =================
app.post("/add-product", async (req, resp) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    resp.status(201).json(result);
  } catch (error) {
    resp.status(500).json({ message: "Product not added" });
  }
});

// ================= PRODUCT LIST API =================
app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.json(products);
  } else {
    resp.json({ message: "No Product found" });
  }
});


// =========== Delete API ===========
app.delete("/product/:id",async (req,resp)=>{
     const result = await Product.deleteOne({_id:req.params.id})
     resp.send(result);
})

// ========== Update API ==========
app.get("/product/:id", async(req,resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
      resp.send(result);
    }else{
      resp.send({result: 'No record found'});
    }
})


// =========== Update Product API =============

app.put("/product/:id", async(req,resp)=>{
     let result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set : req.body
      }
     );
     resp.send(result);
});


// =========== Search Product API =============

app.get("/search/:key", async(req,resp)=>{
     let result = await Product.find({
      "$or":[
              {name : { $regex: req.params.key }},
               {company : { $regex: req.params.key }},
                {category : { $regex: req.params.key }}
      ]
     }
     );
     resp.send(result);
});


// Server
app.listen(5100, () => {
  console.log("Server running on port 5100");
});
