const express=require('express')
const app=express()
require("dotenv").config();
const jwt = require("jsonwebtoken");
const isAuthenticated=(req,res,next)=>{
    const token=req.cookies
    if(!token.jwt){
        return res.status(401).json({message:"No token provided"})
    }
    const decoded = jwt.verify(token.jwt, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({message:"Invalid token"})
    }
    req.user = decoded.userId;
    next()


}
module.exports=isAuthenticated