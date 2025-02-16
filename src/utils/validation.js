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
module.exports={validateSignUpData};