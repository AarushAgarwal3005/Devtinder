const express = require("express")
const dbConnect = require("./config/database.js")
const cookieParser=require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser())

const authRouter=require("./routes/auth.js")
const profileRouter=require("./routes/profile.js")
const requestRouter=require("./routes/request.js")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)



const startServer = async () => {
    try {
        await dbConnect(); // Wait for DB connection
        app.listen(PORT, () => {
            console.log("✅ Server running on port 5000");
        });
    } catch (error) {
        console.error("❌ Error connecting to database:", error);
        process.exit(1); // Stop the server on DB failure
    }
};

startServer();