const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config(); 

const JWT_SECRET = process.env.JWT_SECRET;

const generateJwtToken=(userId,res)=>{
    const token=jwt.sign({userId},JWT_SECRET,{expiresIn:"15m"})
    res.cookie("jwt",token,{
        maxAge:900000,
        httpOnly:true,
        secure:true
    })

}
module.exports=generateJwtToken