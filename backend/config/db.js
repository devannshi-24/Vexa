import mongoose from "mongoose";

const connectdb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }
    catch(error){
        console.error("Error connecting to MongoDB",error)
    }
}

export default connectdb;