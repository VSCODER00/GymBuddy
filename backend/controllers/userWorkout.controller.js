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
            else if (availability === 4) split_type = "Push Pull";
            else if (availability === 5) split_type = "Push Pull";
            else if (availability === 6) split_type = "Push Pull Leg";
            else split_type = "Bro";
        }

        let sets
        let reps
        if(goals==="FatLoss"){
            sets="3-4"
            reps="12-15"
        }
        else if (goals === "MuscleGain"){
            sets="3-5"
            reps="8-12"
        }
        else if (goals === "StrengthGain"){
            sets="4-6"
            reps="3-6"
        }
        else if(goals==="IncreasedEndurance"){
            sets="2-3"
            reps="15-20"
        }
        else if(goals==="FlexibilityAndBalance"){
            sets="2-3"
            reps="10-15"
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
        else if(split_type==='Upper Lower'){ //Upper Body Muscles: Chest, Shoulders, Back, Triceps, Biceps lower Body Muscles: Glutes, Quads, Hamstrings, Calves
            split_structure={
                "Day1":{
                    "Bench Press":{"sets":sets,"reps":reps},
                    "Overhead Press":{"sets":sets,"reps":reps},
                    "Rear Delt Fly":{"sets":sets,"reps":reps},
                    "Trap Raises":{"sets":sets,"reps":reps},
                    "Bicep Curls":{"sets":sets,"reps":reps},
                },
                "Day2":{
                    "Squats":{"sets":sets,"reps":reps},
                    "Split Squats":{"sets":sets,"reps":reps},
                    "Hip Thrust":{"sets":sets,"reps":reps},
                    "Leg Curls":{"sets":sets,"reps":reps},
                    "Calf Raises":{"sets":sets,"reps":reps},
                    "Core Work":{"sets":sets,"reps":reps},
                },
                "Day3":{
                    "Bent Over Barbell Row":{"sets":sets,"reps":reps},
                    "Weight Pull Ups":{"sets":sets,"reps":reps},
                    "Incline DB Bench Press":{"sets":sets,"reps":reps},
                    "Seated Arnold Press":{"sets":sets,"reps":reps},
                    "Lateral Raises":{"sets":sets,"reps":reps},
                    "Tricep Kickbacks":{"sets":sets,"reps":reps},
                },
                "Day4":{
                    "Deadlifts":{"sets":sets,"reps":reps},
                    "Good Mornings":{"sets":sets,"reps":reps},
                    "Leg Press":{"sets":sets,"reps":reps},
                    "Stiff-Leg Deadlift":{"sets":sets,"reps":reps},
                    "Leg Extensions":{"sets":sets,"reps":reps},
                    "Core Work":{"sets":sets,"reps":reps},
                }
                
            }
        }
        else if(split_type==='Push Pull'){
            if(availability===4){
                split_structure={
                    "Day1":{
                        "Squats":{"sets":sets,"reps":reps},
                        "Bench Press":{"sets":sets,"reps":reps},
                        "Bulgarian Split-Squat":{"sets":sets,"reps":reps},
                        "Overhead Press":{"sets":sets,"reps":reps},
                        "Bar Dips":{"sets":sets,"reps":reps},
                    },
                    "Day2":{
                        "Seated Cable Row":{"sets":sets,"reps":reps},
                        "Romanian Deadlift":{"sets":sets,"reps":reps},
                        "Lat Pulldown":{"sets":sets,"reps":reps},
                        "Reverse Dumbbell Fly":{"sets":sets,"reps":reps},
                        "Barbell Curl":{"sets":sets,"reps":reps},
                    },
                    "Day3":{
                        "Leg Extension":{"sets":sets,"reps":reps},
                        "Leg Press":{"sets":sets,"reps":reps},
                        "Incline Dumbbell Press":{"sets":sets,"reps":reps},
                        "Standing Cable Chest Fly":{"sets":sets,"reps":reps},
                        "Dumbbell Lateral Raise":{"sets":sets,"reps":reps},
                        "Barbell Lying Triceps Extension":{"sets":sets,"reps":reps}
                    },
                    "Day4":{
                        "Deadlift":{"sets":sets,"reps":reps},
                        "Leg Curl":{"sets":sets,"reps":reps},
                        "Barbell Row":{"sets":sets,"reps":reps},
                        "Lat Pulldown With Supinated Grip":{"sets":sets,"reps":reps},
                        "Face Pull":{"sets":sets,"reps":reps},
                    }
                }
            }
            else if(availability===5){
                split_structure={
                    "Day1":{
                        "Squats":{"sets":sets,"reps":reps},
                        "Bench Press":{"sets":sets,"reps":reps},
                        "Bulgarian Split-Squat":{"sets":sets,"reps":reps},
                        "Overhead Press":{"sets":sets,"reps":reps},
                        "Bar Dips":{"sets":sets,"reps":reps},
                    },
                    "Day2":{
                        "Seated Cable Row":{"sets":sets,"reps":reps},
                        "Romanian Deadlift":{"sets":sets,"reps":reps},
                        "Lat Pulldown":{"sets":sets,"reps":reps},
                        "Reverse Dumbbell Fly":{"sets":sets,"reps":reps},
                        "Barbell Curl":{"sets":sets,"reps":reps},
                    },
                    "Day3": "Rest",
                    "Day4":{
                        "Leg Extension":{"sets":sets,"reps":reps},
                        "Leg Press":{"sets":sets,"reps":reps},
                        "Incline Dumbbell Press":{"sets":sets,"reps":reps},
                        "Standing Cable Chest Fly":{"sets":sets,"reps":reps},
                        "Dumbbell Lateral Raise":{"sets":sets,"reps":reps},
                        "Barbell Lying Triceps Extension":{"sets":sets,"reps":reps}
                    },
                    "Day5":{
                        "Deadlift":{"sets":sets,"reps":reps},
                        "Leg Curl":{"sets":sets,"reps":reps},
                        "Barbell Row":{"sets":sets,"reps":reps},
                        "Lat Pulldown With Supinated Grip":{"sets":sets,"reps":reps},
                        "Face Pull":{"sets":sets,"reps":reps},
                    }
                }
            }
        }
        else if(split_type==='Push Pull Leg'){
            if(availability===5){
                split_structure={
                    "Day1":{
                        "Flat Bench Press":{"sets":sets,"reps":reps},
                        "Incline DB Press":{"sets":sets,"reps":reps},
                        "Military Press":{"sets":sets,"reps":reps},
                        "Weighted Bar Dips":{"sets":sets,"reps":reps},
                        "Triceps Pushdown":{"sets":sets,"reps":reps}
                    },
                    "Day2":{
                        "Deadlift":{"sets":sets,"reps":reps},
                        "Weighted Pullups":{"sets":sets,"reps":reps},
                        "Lat Pulldown":{"sets":sets,"reps":reps},
                        "Seated Machine Row":{"sets":sets,"reps":reps},
                        "Barbell Curl":{"sets":sets,"reps":reps}
                    },
                    "Day3":{
                        "Back Squat":{"sets":sets,"reps":reps},
                        "Leg Press":{"sets":sets,"reps":reps},
                        "Smith Machine Lunges":{"sets":sets,"reps":reps},
                        "Leg Extension":{"sets":sets,"reps":reps},
                        "Leg Curl":{"sets":sets,"reps":reps},
                        "Ab Wheel Rollout":{"sets":sets,"reps":reps}
                    },
                    "Day4":{
                        "Incline Bench Press":{"sets":sets,"reps":reps},
                        "Pec Deck Fly":{"sets":sets,"reps":reps},
                        "Bent-over Cable Fly":{"sets":sets,"reps":reps},
                        "DB Overhead Press":{"sets":sets,"reps":reps},
                        "1-arm Overhead Extension":{"sets":sets,"reps":reps},
                        "1-arm Crossbody Pushdown":{"sets":sets,"reps":reps}
                    },
                    "Day5":{
                        "Pullups":{"sets":sets,"reps":reps},
                        "Close Grip Pulldown":{"sets":sets,"reps":reps},
                        "Chest Supported T-Row":{"sets":sets,"reps":reps},
                        "Machine / Cable Lat Pullover":{"sets":sets,"reps":reps},
                        "Upright Row / Shrug":{"sets":sets,"reps":reps},
                        "Preacher Curl":{"sets":sets,"reps":reps},
                        "Reverse Curl":{"sets":sets,"reps":reps}
                    },
                }
            }
            else if(availability===6 || availability===7){
                split_structure={
                    "Day1":{
                        "Flat Bench Press":{"sets":sets,"reps":reps},
                        "Incline DB Press":{"sets":sets,"reps":reps},
                        "Military Press":{"sets":sets,"reps":reps},
                        "Weighted Bar Dips":{"sets":sets,"reps":reps},
                        "Triceps Pushdown":{"sets":sets,"reps":reps}
                    },
                    "Day2":{
                        "Deadlift":{"sets":sets,"reps":reps},
                        "Weighted Pullups":{"sets":sets,"reps":reps},
                        "Lat Pulldown":{"sets":sets,"reps":reps},
                        "Seated Machine Row":{"sets":sets,"reps":reps},
                        "Barbell Curl":{"sets":sets,"reps":reps}
                    },
                    "Day3":{
                        "Back Squat":{"sets":sets,"reps":reps},
                        "Leg Press":{"sets":sets,"reps":reps},
                        "Smith Machine Lunges":{"sets":sets,"reps":reps},
                        "Hip Thrust":{"sets":sets,"reps":reps},
                        "Hanging Knee Raise":{"sets":sets,"reps":reps},
                        "Forearm Plank":{"sets":sets,"reps":reps}
                    },
                    "Day4":{
                        "Incline Bench Press":{"sets":sets,"reps":reps},
                        "Pec Deck Fly":{"sets":sets,"reps":reps},
                        "Bent-over Cable Fly":{"sets":sets,"reps":reps},
                        "DB Overhead Press":{"sets":sets,"reps":reps},
                        "1-arm Overhead Extension":{"sets":sets,"reps":reps},
                        "1-arm Crossbody Pushdown":{"sets":sets,"reps":reps}
                    },
                    "Day5":{
                        "Pullups":{"sets":sets,"reps":reps},
                        "Close Grip Pulldown":{"sets":sets,"reps":reps},
                        "Chest Supported T-Row":{"sets":sets,"reps":reps},
                        "Machine/Cable Lat Pullover":{"sets":sets,"reps":reps},
                        "Upright Row/Shrug":{"sets":sets,"reps":reps},
                        "Preacher Curl":{"sets":sets,"reps":reps},
                        "Reverse Curl":{"sets":sets,"reps":reps}
                    },
                    "Day6":{
                        "Leg Extension":{"sets":sets,"reps":reps},
                        "Hack Squat":{"sets":sets,"reps":reps},
                        "Leg Curl":{"sets":sets,"reps":reps},
                        "Cable Crunches + Knee Raises":{"sets":sets,"reps":reps},
                        "Ab Wheel Rollout":{"sets":sets,"reps":reps},
                        "Low Back Extension":{"sets":sets,"reps":reps}
                    }
                }
            }
        }
        else if(split_type==="Bro"){
            split_structure={
                "Day1":{
                    "Barbell Bench Press":{"sets":sets,"reps":reps},
                    "Incline DB Bench Press":{"sets":sets,"reps":reps},
                    "Cable Fly High to Low":{"sets":sets,"reps":reps},
                    "Cable Fly Low to High":{"sets":sets,"reps":reps},
                    "Dips":{"sets":sets,"reps":reps}
                },
                "Day2":{
                    "Deadlifts":{"sets":sets,"reps":reps},
                    "Pull Ups":{"sets":sets,"reps":reps},
                    "Bent Over Barbell Row":{"sets":sets,"reps":reps},
                    "Seated Close Grip Row":{"sets":sets,"reps":reps},
                    "Kroc Row (aka Single Arm Row)":{"sets":sets,"reps":reps},
                    "Rear Delt Fly":{"sets":sets,"reps":reps}
                },
                "Day3":{
                    "Barbell Bicep Curl":{"sets":sets,"reps":reps},
                    "Concentration Curl":{"sets":sets,"reps":reps},
                    "Close Grip Bench":{"sets":sets,"reps":reps},
                    "Tricep Overhead Extension":{"sets":sets,"reps":reps},
                    "Tricep Kickback":{"sets":sets,"reps":reps},
                    "Hanging Leg Raises":{"sets":sets,"reps":reps},
                    "Plank":{"sets":sets,"reps":reps},
                    "Side Plank":{"sets":sets,"reps":reps}
                },
                "Day4":{
                    "Back Squats":{"sets":sets,"reps":reps},
                    "Stiff-Leg Deadlifts":{"sets":sets,"reps":reps},
                    "Barbell Hip Thrusts":{"sets":sets,"reps":reps},
                    "Split Squats":{"sets":sets,"reps":reps},
                    "Leg Extensions":{"sets":sets,"reps":reps},
                    "Leg Curls":{"sets":sets,"reps":reps},
                    "Calf Raises":{"sets":sets,"reps":reps}
                },
                "Day5":{
                    "Standing Overhead Press":{"sets":sets,"reps":reps},
                    "Seated Arnold Press":{"sets":sets,"reps":reps},
                    "Lateral Raises":{"sets":sets,"reps":reps},
                    "Front Raises:":{"sets":sets,"reps":reps},
                    "Upright Rows":{"sets":sets,"reps":reps},
                    "Shrugs":{"sets":sets,"reps":reps}
                },
            }
        }
        res.send(split_structure)

    }
    catch(error){
        return res.status(400).json({ message: error.message });
    }
}

module.exports={setUserWorkout}