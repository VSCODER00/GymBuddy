const express=require('express')
const router=express.Router()
const {signup,login,sayHi} = require('../controllers/auth.controller')
const isAuthenticated = require('../middleware/auth.middleware')


router.post("/signup",signup)
router.post("/login",login)
router.get("/hi",isAuthenticated,sayHi)
module.exports=router