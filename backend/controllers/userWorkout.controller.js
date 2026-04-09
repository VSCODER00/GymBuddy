const userAttributesDB=require('../models/user.attributes.model')
const setUserWorkout=async(req,res)=>{
    try{
        const userId=req.user
        const {goals,experience,availability}=await userAttributesDB.findOne({userId:userId})
        //role of goals is to determine the number of sets and reps only
        let split_type=''
        if(experience=='Beginner'){
            if(availability<=3){
                split_type = "Full Body"
            }
            else if(availability===4){
                split_type = "Upper Lower"
            }
            else split_type = "Push Pull Leg"
        }

        else if(experience=='Intermediate'){
            if (availability <= 3) split_type = "Full Body"
            else if (availability === 4) split_type = "Upper Lower"
            else if (availability === 5) split_type = "Push Pull"
            else split_type = "Push Pull Leg"
        }
        else{
            if (availability <= 3) split_type = "Full Body";
            else if (availability === 4) split_type = "Upper Lower";
            else if (availability === 5) split_type = "Push Pull";
            else if (availability === 6) split_type = "Push Pull Leg";
            else split_type = "Bro";
        }

        let sets
        let reps
        if(goals==="FatLoss"){
            sets=3
            reps=15
        }
        else if (goals === "MuscleGain"){
            sets=4
            reps=10
        }
        else if (goals === "StrengthGain"){
            sets=5
            reps=5
        }
        else if(goals==="IncreasedEndurance"){
            sets=3
            reps=18
        }
        else if(goals==="FlexibilityAndBalance"){
            sets=3
            reps=12
        }
        
        let split_structure
        if(split_type==='Full Body'){
            if(availability===2){
                split_structure={
                    "Day1":{
                        "Squats":{"sets":sets,"reps":reps},
                        "Bench Press":{"sets":sets,"reps":reps},
                        "Seated DB Shoulder Press":{"sets":sets,"reps":reps},
                        "Rows":{"sets":sets,"reps":reps},
                        "Hanging Leg Raises":{"sets":sets,"reps":reps}
                    },
                    "Day2":{
                        "Deadlifts":{"sets":sets,"reps":reps},
                        "Overhead Press":{"sets":sets,"reps":reps},
                        "DB incline Press":{"sets":sets,"reps":reps},
                        "Planks":{"sets":sets,"reps":reps},
                    }
                }
            }
            else if(availability===3){
                split_structure={
                    "Day1":{
                        "Squats":{"sets":sets,"reps":reps},
                        "Overhead Press":{"sets":sets,"reps":reps},
                        "Rows":{"sets":sets,"reps":reps},
                        "Dips":{"sets":sets,"reps":reps},
                    },
                    "Day2":{
                        "Bench Press":{"sets":sets,"reps":reps},
                        "Pull Ups":{"sets":sets,"reps":reps},
                        "Split Squats":{"sets":sets,"reps":reps},
                        "Planks":{"sets":sets,"reps":reps},
                    },
                    "Day3":{
                        "Deadlifts":{"sets":sets,"reps":reps},
                        "Seated DB Overhead Press":{"sets":sets,"reps":reps},
                        "Push Ups":{"sets":sets,"reps":reps},
                        "Hanging Leg Raises":{"sets":sets,"reps":reps},
                    }
                }
            }
        }
        else if(split_type==='Upper Lower'){

        }
        else if(split_type==='Push Pull'){

        }
        else if(split_type==='Push Pull Leg'){

        }
        else if(split_type==="Bro"){

        }


    }
    catch(error){
        return res.status(400).json({ message: error.message });
    }
}

module.exports={setUserWorkout}