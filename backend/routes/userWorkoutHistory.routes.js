const express = require("express");
const isAuthenticated = require("../middleware/auth.middleware");
const { saveUserWorkout, getUserHistory } = require("../controllers/userWorkoutHistory.controller");

const router=express.Router()
router.post("/saveWorkout",isAuthenticated,saveUserWorkout)
router.get("/getExercise/:exerciseName",isAuthenticated,getUserHistory)

module.exports=router