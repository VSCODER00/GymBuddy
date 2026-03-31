const userdb=require('../models/user.model')
const bcrypt = require("bcrypt");

const generateToken=require('../utils/jwtTokenGen')
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
    generateToken(newDetails._id,res)
    await newDetails.save()
    
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
    generateToken(user._id,res)
    return res.status(200).json({ message: "Signed in successfully"});
    

}
const sayHi=(req,res)=>{
   
res.send("Hello world")
}
module.exports={signup,login,sayHi}