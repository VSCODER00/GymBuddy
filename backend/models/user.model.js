const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    email:{
        type:String,
        required:[true,"please provide email"],
        unique:true
    },
    hashed_password:{
        type:String,
        required:[true]
    }

},{timestamps:true})

const User=mongoose.model("User",userSchema)

module.exports=User