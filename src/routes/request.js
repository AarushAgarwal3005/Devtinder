const express = require("express")
const requestRouter = express.Router()
const userAuth = require("../middlewares/auth.js")
const User = require("../models/user.js")
const connectionrequest = require("../models/connectionRequest.js")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {

        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status
        const connectionRequested = new connectionrequest({

            fromUserId,
            toUserId,
            status,

        })
        //valid user id 
        const toUser = await User.findById(toUserId)
        if (!toUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        //check for user sending request to himself
        if (fromUserId.toString() === toUserId.toString()) {
            return res.status(400).json({
                message: "you can't send request to yourself"
            })
        }
        //status allowed 
        const allowedStatus = ["liked", "ignored"]
        if (!allowedStatus.includes) {
            return res.status(400).send("status is not allowed" + status)
        }
        //check for any existing user
        const existingRequest = await connectionrequest.findOne({
            $or: [{
                    fromUserId: fromUserId,
                    toUserId: toUserId
                },
                {
                    fromUserId: toUserId,
                    toUserId: fromUserId
                },

            ]
        })

        if (existingRequest) {
            return res.status(400).send({
                message: " connection request already exist"
            })
        }

        const result = await connectionRequested.save()
        

        res.json({
            message: req.user.firstName +" " + status +toUser.firstName,
            result,
        });
       

    } catch (error) {
        res.status(400).send("ERROR " + error.message)
    }

})

module.exports = requestRouter