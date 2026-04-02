const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserAttributesSchema=new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true
    },
    goals:{
        type:String,
        enum:['FatLoss','MuscleGain','StrengthGain','IncreasedEndurance','FlexibilityAndBalance']

    },
    experience:{
        type:String,
        enum:['Beginner','Intermediate','Advanced']

    },
    availability:{
        type:Number,
        enum:[2,3,4,5,6,7]
    }
},{timestamps:true})
const UserAttributes=mongoose.model("UserAttributesSchema",UserAttributesSchema)
module.exports=UserAttributes
