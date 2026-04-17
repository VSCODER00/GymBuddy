const userWorkoutHistoryDB = require('../models/userWorkoutHistory.model')

const saveUserWorkout = async (req, res) => {
    try {
        const userId = req.user
        const { exerciseName, sets } = req.body
        if (
            !exerciseName ||
            !sets ||
            !Array.isArray(sets) ||
            sets.length === 0
        ) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const newExerciseData = new userWorkoutHistoryDB({
            userId: userId,
            exerciseName: exerciseName,
            sets: sets
        });
        await newExerciseData.save()
        return res.status(201).json({ message: "Details saved" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getUserHistory = async (req, res) => {
    try {
        const userId = req.user
        const exerciseName = req.params.exerciseName;
        if (!exerciseName) {
            return res.status(400).json({ message: "Exercise name required" });
        }
        const workoutHistory = await userWorkoutHistoryDB
            .find({
                $and: [{ userId: userId }, { exerciseName: exerciseName }],
            })
            .sort({ date: -1 })
            .limit(3);
        res.status(200).json({message:workoutHistory})
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { saveUserWorkout, getUserHistory }