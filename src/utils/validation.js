const validator= require ('validator');

const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body
    if(!firstName&&!lastName){
        throw new Error("name not valid")
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("email not valid")
    }
    else if(!validator.isStrongPassword(password))
        {
            throw new Error("password must contain  1 lowercase, 1 uppercase, 1 special character , 1 number and minimum length 8")
        }
}

const validateEditProfileData=(req)=>{
    const allowedEdits=["firstName","lastName","emailId","age","skills","about"]
    const isEditAllowed=Object.keys(req.body).every(field => allowedEdits.includes(field))
        return isEditAllowed;
    };


    const validateEditPassword=(req)=>{
        const allowedEdits=["password"]
        return Object.keys(req.body).every(field => allowedEdits.includes(field))
        };

module.exports={validateSignUpData,validateEditProfileData};