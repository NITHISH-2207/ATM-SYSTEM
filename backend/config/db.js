const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB Connected"+process.env.PORT);
    } catch (error) {
        console.log("MongoDB Connection Failed");
    }
};
module.exports=connectDB;