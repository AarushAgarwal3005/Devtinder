const express=require("express")
const authRouter=express.Router()
const bcrypt=require("bcrypt")


const User=require("../models/user.js")
const {validateSignUpData}=require("../utils/validation.js")

//USER SIGNUP
authRouter.post("/signup",async(req,res)=>{
   
    try{
        validateSignUpData(req)
        //const data=req.body
        const {firstName,lastName,emailId,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:hashedPassword
        })
        await user.save(); 
        res.send("user created")
    
    }
    catch(err){
        console.log("user not created")
        res.status(400).send("error creating user "+ err.message)

    }
   
})
//LOGIN API
authRouter.post("/login",async(req,res)=>{
    try {
        const {emailId,password}=req.body
        const user=await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid credentials")
        }
        const isValidPassword=await user.validatePassword(password)
        if(isValidPassword)
        // {
        //     const token = jwt.sign({_id: user._id},'thisissecretkey');
        //     console.log(token)
        //     res.cookie("token",token)
        //     res.send("login success")
        // }
        {
            const token =await user.getJWT()
            res.cookie("token",token)
            res.send("login success")

        }
         else{  throw new Error("Invalid credentials")}
          
        
        
    
}catch (err) {
        res.status(400).send("error logging user "+ err.message)

    }
})
module.exports=authRouter