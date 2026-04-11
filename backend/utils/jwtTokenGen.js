const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config(); 

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateJwtToken=(userId,res)=>{
    const token=jwt.sign({userId},JWT_SECRET,{expiresIn:"15m"})
    res.cookie("jwt", token, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
    });
    return token
}

const generateRefreshToken=(userId,res)=>{
    const token=jwt.sign({userId},REFRESH_SECRET,{expiresIn:"30d"})
    res.cookie("refreshToken", token, {
      maxAge: 30*24*60*60*1000,
      httpOnly: true,
      secure: true,
    });
    return token
}
module.exports={generateJwtToken,generateRefreshToken}