const mongoose=require('mongoose')
const schema=mongoose.Schema

const UserWorkoutSchema=new schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            unique:true
    },
    split_type:{
        type:String,
        enum:['Full Body',"Upper Lower","Push Pull Leg","Push Pull","Bro"]
    },
    currentIndex:{
        type:Number
    },
    split_structure:{
        type:schema.Types.Mixed
    }

},{timestamps:true})

const userworkout=mongoose.model("UserWorkoutSchema",UserWorkoutSchema)
module.exports=userworkout