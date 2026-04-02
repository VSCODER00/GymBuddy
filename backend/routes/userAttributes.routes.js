const express=require('express')
const isAuthenticated = require('../middleware/auth.middleware')
const {getUserAttributes,setUserAttributes, updateUserAttributes} = require('../controllers/userAttributes.controller')
const router=express.Router()

router.get("/getUserAttributes",isAuthenticated,getUserAttributes)
router.post("/setUserAttributes",isAuthenticated,setUserAttributes)
router.patch("/updateUserAttributes",isAuthenticated,updateUserAttributes)
module.exports=router