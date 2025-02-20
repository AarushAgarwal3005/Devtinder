const express= require("express")
const requestRouter=express.Router()
const userAuth=require("../middlewares/auth.js")

requestRouter.get("/getConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user

    res.send(user.firstName +" sent a request")
})

module.exports=requestRouter