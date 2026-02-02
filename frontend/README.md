Frontend Setup
step1
cmd- npm create vite@latest .
select framework - React
select variant - javascript + SWC
cmd - npm install (install dependencies)
cmd - npm run dev ( Run Project)
PORT NUMBER : 5173

step2
Install Routing
cmd - npm i react-router-dom
implement Routing and Links
Make Header with Css
make Footer With Css
make SignUp Page Layout
Here We Make 3 input Field (name , email, Password) with state (setName,setEmail,setPassword)
onChange={(e)=>setName(e.target.value)}
onChange={(e)=>setEmail(e.target.value)}
onChange={(e)=>setPassword(e.target.value)}

step 3
integrate Register API in raect 1. axios is a package to fetch API
cmd - npm i axios

       2. fecth is a core method of js to fetch API
          fetch("api path")

          complete API
               const collectData = async () => {
               console.warn(name, email, password);
               let result = await fetch("http://localhost:5100/register", {
                 method: "post",
                 body: JSON.stringify({ name, email, password }),
                 headers: {
                   "Content-Type": "application/json",
                 },
               });
               result = await result.json();
               console.warn(result);
               if(result){
                 navigate('/')  // jaise hi register Hoga  move to Home Page
               }
                }                 ;
  step 4 
     we use 
        import { useNavigate } from "react-router-dom";  // import karenge
        const  navigate = useNavigate();  // use kar lenge
        if(result){
            navigate('/') // use kar liya
         }

   step 5
     compelete Signup Flow
         1.  LocalStorage me data rahe After Signup
           here  
               localStorage.setItem("user", JSON.stringify(result));
                 // here result me se jo data aayega wo user me save hoga by setItem() method. 
 
         2. Make Private Component
             localStorage me password nahi show karwate hai ishko hamesha backend se hatana chaiye

         These routes are Private component

                <Route element={<PrivateComponent/>}>
                   <Route path="/" element={<Home />}/>
                   <Route  path="/add" element={<AddProduct/>}/>
                   <Route  path="/update" element={<UpdateProduct />}/>
                   <Route  path="/logout" element={<Logout/>}/>
                   <Route  path="/profile" element={<Profile/>}/>
                 </Route>

         These logic private routes

              import React from 'react'
              import { Navigate, Outlet } from "react-router-dom";
              export default function PrivateComponent() {
                  const auth = localStorage.getItem('user');
                return auth?<Outlet/>:<Navigate to="/register" />
              }
         
         These Code tell the If User Register then it navigate to home page

            useEffect( ()=>{
               const auth = localStorage.getItem('user');
               if(auth){
                navigate('/')
               }
            })

   
         3. Agar User register then not show register link and show Logout
               
                  <li>
                {auth ? (
                  <Link to="/logout">Logout</Link>
                ) : (
                  <Link to="/register">Register</Link>
                )}
                 </li>
      
             {!auth && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
               )}


   step-6
       make logout  functionality

          const navigate = useNavigate();
              const logout = ()=>{
                  localStorage.clear();
                  navigate('/register')
              }
      React code 
           <Link onClick={logout} to="/register">Logout</Link>


  step 7
    Login API implement
                   
              const handleLogin = async () => {
              console.log(email, password);
              let result = await fetch("http://localhost:5100/login", {
                method: "post",
                body: JSON.stringify({ email, password }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              result = await result.json();
              console.warn(result);
              if (result.name) {
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/");
              } else {
                alert("Please enter valid details");
              }
            };
    
    step 8
      Real update in datebase ( PUT API ) implementation

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

  step 9
    Add logo
        <img src={logo} alt="Profile" className="logo-set"/>
        css
           .logo-set {
             position: fixed;
             top: 5px;
             left: 25px;
             width: 50px;
             height: 50px;
             border-radius: 50%;
             object-fit: cover;
             z-index: 1000;
           }

      step 10 add validation on input fields
         // Simple Validation
           const validateProdu ct = () => {
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

       JWT Authentication
         JWT = JSON Web Token
         cmd = npm i jsonwebtoken
          Q1. how to apply jwt authentication OR normal token and how to send and handle token inside API

          Q2. we have a token aa gaya then how to manage token 
        

        This code write in index.js

         require karo two line    
              const Jwt = require('jsonwebtoken');
              const jwtKey = 'e-dashboard';

           
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