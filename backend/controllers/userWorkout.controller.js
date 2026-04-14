const userAttributesDB = require("../models/userAttributes.model");
const userWorkoutDB = require("../models/userWorkout.model");
const { generateUserWorkout } = require("../utils/userWorkoutGenerator");

const setUserWorkout = async (req, res) => {
    try {
        const userId = req.user;
        const existing = await userWorkoutDB.findOne({ userId })
        if (existing) return res.status(400).json({ message: "Workout already exists, use update instead" })
        const { goals, experience, availability } = await userAttributesDB.findOne({
            userId: userId,
        });
        const {split_type,split_structure}=generateUserWorkout(goals,experience,availability)
        const userWorkout = new userWorkoutDB({
            userId: userId,
            split_type: split_type,
            currentIndex: 0,
            split_structure: split_structure,
        });
        await userWorkout.save();
        res
            .status(201)
            .json({ message: "Workout successfully generated and saved" });
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getUserWorkout = async (req, res) => {
    try {
        const userId = req.user;
        const userWorkout = await userWorkoutDB.find({ userId: userId });
        return res.status(200).send(userWorkout);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const updateUserWorkout=async(req,res)=>{
    try{
        const userId = req.user;
        const { goals, experience, availability } =await userAttributesDB.findOne({userId: userId,});
        const {split_type,split_structure}=generateUserWorkout(goals,experience,availability)
        const newWorkout={
            userId: userId,
            split_type: split_type,
            currentIndex: 0,
            split_structure: split_structure,
        }
        await userWorkoutDB.replaceOne({userId:userId},newWorkout,{upsert:false})
        res.status(200).json({ message: "Workout successfully updated" });
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
}

module.exports = { setUserWorkout, getUserWorkout,updateUserWorkout };
