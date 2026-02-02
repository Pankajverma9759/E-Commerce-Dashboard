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
