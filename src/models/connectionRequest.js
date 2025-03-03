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
connectionRequestSchema.index({fromUserId:1, toUserId:1})//compound indexing

const connectionRequestModel=new mongoose.model(
    "connectionrequest",
    connectionRequestSchema
);

module.exports=connectionRequestModel