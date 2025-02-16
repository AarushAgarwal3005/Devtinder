const express = require("express")
const dbConnect = require("./config/database.js")
const app = express()
const User=require("./models/user.js")
const { Error } = require("mongoose")
const {validateSignUpData}=require("./utils/validation.js")
const bcrypt=require("bcrypt")
app.use(express.json())
//USER SIGNUP
app.post("/signup",async(req,res)=>{
   
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
app.post("/login",async(req,res)=>{
    try {
        const {emailId,password}=req.body
        const isValidEmail=await User.findOne({emailId:emailId})
        if(!isValidEmail){
            throw new Error("Invalid credentials")
        }
        const isValidPassword=await bcrypt.compare(password,isValidEmail.password)
        if(!isValidPassword){
            throw new Error("Invalid credentials")}
            res.send("login success")
        
    } catch (err) {
        res.status(400).send("error logging user "+ err.message)

    }
})
//GET A SINGLE USER
app.get("/user",async(req,res)=>{
    const userid=req.body._id
    
    try {
        console.log(userid)
        const user=await User.findById({_id:userid})
        res.send(user)
    } catch (err) {
        res.status(404).send("user not found "+err.message)
    }
})
//GET ALL USERS
app.get("/feed",async(req,res)=>{
    try {
        
        const users=await User.find({})
        res.send(users)
    } catch (err) {
        res.status(404).send("users not found "+err.message)
    }
})
//DELETE ONE USER
app.delete("/user",async(req,res)=>{
    const userid=req.body.emailId
    const userName=req.body.firstName
    try {
        console.log(userid)
        const user=await User.deleteOne({emailId:userid})
        res.send(userName+" is deleted")
    } catch (err) {
        res.status(404).send("user not found "+err.message)
    }
})
//UPDATE ANY USER FIELDS
app.patch("/user",async(req,res)=>{
    const userid=req.body._id
    const data=req.body
    try {
        //    if(data?.skills.length>10){
        //     return res.status(400).json({message:"You can't add more than 10 skills"})
        // }
        // if(data?.about.length>500){
        //     return res.status(400).json({message:"You can't add more than 500 characters"})
        // }
        // if(data?.photoUrl.length>1){
        //     return res.status(400).json({message:"only 1 url allowed"})
        // }
        const user=await User.findByIdAndUpdate(userid,data)

        res.send("user updated"+user)
       
    } catch (err) {
        res.status(404).send("user not found "+err.message)
    }
})
// app.patch("/user",async(req,res)=>{
//     const userid=req.body._id
//     const data=req.body
//     try {
        
//         const user=await User.findByIdAndUpdate(userid,data)

//         res.send("user updated"+user)
       
//     } catch (err) {
//         res.status(404).send("user not found "+err.message)
//     }
// })



dbConnect()
    .then(() => {
        console.log("databse connected successfully")
        app.listen(5000, () => {
            console.log("server created on port 5000")
        })
    }).catch((err) => {
        console.log("error connecting to database")
    })