require("dotenv").config(); 
const express=require('express')
const mongoose=require('mongoose')
const app=express()
const mongoDBURL = process.env.MONGODB_URL;
app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(5000,()=>{
    console.log("app is running")
})

mongoose
  .connect(mongoDBURL, {
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.error("Connection Error:", err));