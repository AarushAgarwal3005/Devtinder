const express = require("express")
const dbConnect = require("./config/database.js")
const cookieParser=require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

const authRouter=require("./routes/auth.js")
const profileRouter=require("./routes/profile.js")
const requestRouter=require("./routes/request.js")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)



dbConnect()
    .then(() => {
        console.log("databse connected successfully")
        app.listen(5000, () => {
            console.log("server created on port 5000")
        })
    }).catch((err) => {
        console.log("error connecting to database")
    })