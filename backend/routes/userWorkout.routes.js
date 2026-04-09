const express = require("express");
const isAuthenticated = require("../middleware/auth.middleware");
const { setUserWorkout } = require("../controllers/userWorkout.controller");

const router=express.Router()


router.get('/setWorkout',isAuthenticated,setUserWorkout)
module.exports=router
