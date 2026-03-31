require("dotenv").config(); 
const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cookieParser = require("cookie-parser");
const mongoDBURL = process.env.MONGODB_URL;
const authRoutes=require("./routes/auth.routes")
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.use('/auth',authRoutes)
app.listen(5000,()=>{
    console.log("app is running")
})

mongoose
  .connect(mongoDBURL, {
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.error("Connection Error:", err));