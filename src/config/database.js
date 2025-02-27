const mongoose= require("mongoose")
require("dotenv").config(); // Load environment variables

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database Connected Successfully");
    } catch (error) {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1); // Exit if the connection fails
    }
};
module.exports = dbConnect;