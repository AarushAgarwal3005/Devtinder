const mongoose=require("mongoose");
const validator=require ("validator");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        
        trim:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        index:true, 
        maxLength:50
    },
    emailId:{
        type:String,
        unique:true,//automatically makes index for it
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("invalid email"+value)
            }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new error("minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1")
            }
        }

    },
    age:{
        type:Number,
        min:18
    },
    gender:{
            type:String,
            validate(value)
            {
                if(value!=="male" && value!=="female"&&value!=="others")
                {
                    throw new Error("Invalid gender");
                }
            }
        },
        // photoUrl:{
        //     type:String,
        //     default:"this is a pic url",
        //     validate(value){
        //         if(!validator.isURL(value)){
        //             throw new error("not a valid url")
        //         }
        //     }
        // },
        about:{
            type:String,
            default:"this is a about me"

        },
        skills:{type:[String]},
    resetOTP: { type: String }, 
    otpExpires: { type: Date },


},
{timestamps:true})

userSchema.index({firstName:1,lastName:1})//compound indexing
//generate jwt
userSchema.methods.getJWT=async function (){
    const user=this;
    const token= jwt.sign({_id:user._id},'thisissecretkey',{ expiresIn: '10d' })
    return token
}
//validate password
userSchema.methods.validatePassword=async function (passwordByUserInput){
const user=this
const passwordHash=user.password
const isValidPassword=await bcrypt.compare(passwordByUserInput,passwordHash)
return isValidPassword
}

const User= mongoose.model("User",userSchema)
module.exports=User;