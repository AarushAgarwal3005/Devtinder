const express = require("express")
const userRouter = express.Router()
const userAuth = require("../middlewares/auth")

const connectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
const USER_SAFE_DATA="firstName lastName age gender about skills"

//for all the pending requests
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const connectionrequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName"])

        res.json({
            message: "data fetched successfully",
            data: connectionrequests
        })


    } catch (error) {
        res.status(400).send("unable to fetch data" + error)
    }
})
//for all the connections of the user
userRouter.get("/user/requests/accepted", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const connectionrequests = await connectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id,status: "accepted",},
                 {fromUserId: loggedInUser._id,status: "accepted",}
                ]
        })
        .populate("fromUserId", ["firstName", "lastName"])
        .populate("toUserId", ["firstName", "lastName"])
        const data=connectionrequests.map((row)=>{
            if(row.fromUserId._id.toString()==loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        })
 

    } catch (error) {
        res.status(400).send("unable to fetch data" + error)
    }
})
//for the user feed 
userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
      //no same user show in feed
      //the users who logged in user have sent interested req should not show in feed
      //the users who the logged in user has ignored should not show in feed
      //he users whose logged in user has accepted/rejected the request should not show in feed
      const loggedInUser = req.user
      const page=parseInt(req.query.page)||1; //PAGINATION
      let limit=parseInt(req.query.limit)||10;
      limit=limit>50 ?50:limit;
      const skip=(page-1)*limit;

      const connectionRequests = await connectionRequest.find({
        $or: [
            {toUserId: loggedInUser._id},
            {fromUserId: loggedInUser._id}
            ],
    }).select("fromUserId toUserId"); 

    const hideUsersFromFeed=new Set();
    connectionRequests.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
    })

 const users=await User.find({
    $and:[
        {_id:{$nin :Array.from(hideUsersFromFeed)}},
        {_id:{$ne:loggedInUser._id}},

    ],

 }).select(USER_SAFE_DATA).skip(skip).limit(limit)

 res.send(users)

    } catch (error) {
        res.status(400).send("unable to fetch data" + error)
    }
})
module.exports = userRouter