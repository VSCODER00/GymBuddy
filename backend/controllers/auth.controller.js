const userdb=require('../models/user.model')
const refreshTokenDb=require('../models/refreshToken.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {generateJwtToken,generateRefreshToken}=require('../utils/jwtTokenGen')
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const signup=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:"All the fields are required"})
    }
    const user=await userdb.findOne({email})
    if(user){
        return res.status(400).json({message:"Already registered"})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newDetails = new userdb({
        email: email,
        hashed_password: hashedPassword,
    });
    generateJwtToken(newDetails._id,res)
    await newDetails.save()
    const refreshToken=generateRefreshToken(newDetails._id,res)
    const refreshTokenDetails = new refreshTokenDb({
      userId: newDetails._id,
      refreshToken:refreshToken
    });
    await refreshTokenDetails.save()

    res.status(201).json({message:"User successfully registered! "})
}

const login=async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All the fields are required" });
    }
    const user=await userdb.findOne({email})
    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const actualPassword=user.hashed_password
    const isMatch=await bcrypt.compare(password,actualPassword)
    if(!isMatch){
        return res.status(400).json({ message: "Invalid credentials" });
    }
    generateJwtToken(user._id,res)
    const refreshToken = generateRefreshToken(user._id, res);
    const refreshTokenDetails = new refreshTokenDb({
      userId: user._id,
      refreshToken: refreshToken,
    });
    await refreshTokenDetails.save();
    return res.status(200).json({ message: "Signed in successfully"});
    

}

const logout=async(req,res)=>{
    try{
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
        await refreshTokenDb.deleteOne({refreshToken})
    }
    res.clearCookie('jwt')
    res.clearCookie('refreshToken')
    res.status(200).json({message:"Logged out successfully"})
}
    catch(error){
        console.log(error)
    }
}

const refreshTheTokens=async(req,res)=>{
    const userRefreshToken=req.cookies.refreshToken
    if(!userRefreshToken){
        return res.status(401).json({message:"Please login again"})
    }
    const refreshTokenFromDB = await refreshTokenDb.findOne({
      refreshToken: userRefreshToken,
    });
    if(!refreshTokenFromDB){
        return res.status(401).json({ message: "Please login again" });
    }
    try{
    const decoded = jwt.verify(userRefreshToken, REFRESH_SECRET);
    generateJwtToken(decoded.userId, res);
    const newRefreshToken = generateRefreshToken(decoded.userId, res);
    await refreshTokenDb.deleteOne({ refreshToken: userRefreshToken });
    await refreshTokenDb.create({
      userId: decoded.userId,
      refreshToken: newRefreshToken,
    });
    return res.status(200).json({ message: "Token refreshed successfully" });
    }
    catch(error){
        return res.status(403).json({ message: "Invalid refresh token" });
    }

}
const sayHi=(req,res)=>{
res.send(req.user)
}

module.exports={signup,login,sayHi,logout,refreshTheTokens}