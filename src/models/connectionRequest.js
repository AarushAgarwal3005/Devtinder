const mongoose=require("mongoose")

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        ref:"User",
        required:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is incorrect type`
        },
    },
},
{timestamps:true}
);

const connectionRequestModel=new mongoose.model(
    "connectionrequest",
    connectionRequestSchema
);

module.exports=connectionRequestModel