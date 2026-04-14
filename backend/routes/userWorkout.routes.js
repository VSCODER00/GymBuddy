const express = require("express");
const isAuthenticated = require("../middleware/auth.middleware");
const { setUserWorkout, getUserWorkout, updateUserWorkout } = require("../controllers/userWorkout.controller");

const router=express.Router()


router.get('/setWorkout',isAuthenticated,setUserWorkout)
router.get('/getWorkout',isAuthenticated,getUserWorkout)
router.put('/updateWorkout',isAuthenticated,updateUserWorkout)
module.exports=router
