const express = require("express")
const userRouter = express.Router()
const userAuth = require("../middlewares/auth")

const connectionRequest = require("../models/connectionRequest")
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
module.exports = userRouter