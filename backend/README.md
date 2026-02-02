Backend Project Setup

step1 - npm init
Install. Packages - express, mongodb, nodemon.
cmd -> npm i express
cmd -> npm i mongoose
cmd -> npm i nodemon

make - index.js file.

step-2
Run backend code using terminal cmd - nodemon
PORT NUMBER = localhost:5100

step 3
MongoDB is Database GUI Tool
default PORT = 27017
path = mongodb://localhost/db-name

step 4
db
config.js
establish connection
connection_string = mongodb+srv://pankajverma141414_db_user:8J1VvYnEKv2vCwGl@myshop.f7on8bx.mongodb.net/E-dashboard
database_name = E-dashboard

  database connection

     const mongoose = require('mongoose');
     mongoose.connect(
       'mongodb+srv://pankajverma141414_db_user:8J1VvYnEKv2vCwGl@myshop.f7on8bx.mongodb.net/E-dashboard'
     )
     .then(() => {
         console.log("MongoDB Connected");
     })
     .catch((err) => {
         console.log("DB Connection Error:", err);
     });
     



    User.js
       make user schema with register form

             const mongoose = require('mongoose');
             const userSchema = new mongoose.Schema({
                 name:String,
                 email:String,
                 password: String
             });
             module.exports = mongoose.model("users",userSchema);

    index.js
       make Register api
              app.post("/register",async (req,resp)=>{
                  let user = new User(req.body);
                  let result = await user.save();
                  resp.send(result);
              })


  step 5
    fix cors issue we use cors package
     install cmd - npm install cors
       require karo top me as a   const cors = request("cors");
       use as a     middleware = app.use(cors());

  step 6
     // Login API
          app.post("/login", async (req, resp) => {
              console.log(req.body);
          
              if (req.body.email && req.body.password) {
          
                  let user = await User.findOne(req.body).select("-password");
          
                  if (user) {
                      resp.send(user);
                  } else {
                      resp.send({ result: "No User Found" });
                  }
          
              } else {
                  resp.send({ result: "Email or Password missing" });
              }
          });
      
      step 7
        // Real time update on database

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

    step 9
     Product Schema

       const mongoose = require('mongoose');
       const productSchema = new mongoose.Schema({
           name:String,
           price:String,
           category: String,
           userId: String,
           company:String
       });
       module.exports = mongoose.model("products",productSchema);

    
    step 9 
       Add Product API
          
         // Add Product API
         app.post("/add-product", async (req,resp)=>{
             let product = new Product(req.body);
              let result = await product.save();
              resp.send(result);
         })


      step 10 
         Product List API 
           Here We get the data from database
                      
           //Product List API
           app.get("/products", async(req,resp)=>{
               let products = await Product.find();
               if(products.length>0){
                   resp.send(products);
               }else{
                   resp.send({result: "No Product found"})
               }
           })



 