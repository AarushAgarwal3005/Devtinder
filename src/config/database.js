const mongoose= require("mongoose")
const dbConnect=async ()=>{
    await mongoose.connect("mongodb+srv://aarushagarwal3005:aaav3019@devtindercluster.o0o6a.mongodb.net/?retryWrites=true&w=majority&appName=devtindercluster")
}
module.exports =dbConnect;