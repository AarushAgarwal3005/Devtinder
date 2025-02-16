const mongoose=require("mongoose");
const validator=require ("validator");
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
        maxLength:50
    },
    emailId:{
        type:String,
        unique:true,
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


},
{timestamps:true})
const User= mongoose.model("User",userSchema)
module.exports=User;