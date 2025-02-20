const jwt= require("jsonwebtoken")
const User=require ("../models/user")

const userAuth=async (req,res,next)=>{
    try {
  
        const {token}= req.cookies
        if(!token) {
            throw new Error("invalid token..")
        }
        const decodeDdata= await jwt.verify(token,"thisissecretkey",{ expiresIn: '10d' })
        const {_id}=decodeDdata
        const user=await User.findById(_id)
        if(!user){
            throw new Error("no user found ..")
        }
        req.user=user
        next()


    } catch (error) {
        res.status(400).send("ERROR:"+error.message)
    }
}
module.exports=userAuth;