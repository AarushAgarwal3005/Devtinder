const express=require("express")
const profileRouter=express.Router()
const userAuth=require("../middlewares/auth.js")
const { validateEditProfileData} = require("../utils/validation.js");


profileRouter.get("/profile/view", userAuth,async(req,res)=>{
    try {
    const user=req.user
    res.send(user);  
    } catch (err) {
        res.status(404).send("profile not found "+err.message)

    }
})
profileRouter.patch("/profile/edit", userAuth,async(req,res)=>{
    try {
        if(!validateEditProfileData(req)) throw new Error("Invalid edit")
            const loggedInUser=req.user
        Object.keys(req.body).forEach((key)=>loggedInUser [key]=req.body[key])
        if (typeof loggedInUser.save === "function") {
            await loggedInUser.save();
        }
        res.send({
            message:`${loggedInUser.firstName},your profile updated successfully`,
        data:loggedInUser,})
    } catch (err) {
        res.status(404).send("profile not found "+err.message)

    }
})

profileRouter.patch("/profile/forgotPassword", userAuth,async(req,res)=>{
    try {
        if(!validateEditPassword) throw new Error("Invalid edit")
        const loggedInUser=req.user
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key])
        await loggedInUser.save();
        res.send({
            message:`${loggedInUser.firstName},your password updated successfully`,
        data:loggedInUser,})
    } catch (err) {
        res.status(404).send("profile not found "+err.message)

    }
})
module.exports=profileRouter; 