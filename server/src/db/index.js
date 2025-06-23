import mongoose from "mongoose";
//import  connection  from "mongoose";
//import { name } from '../utils/contants.js';
import dotenv from "dotenv";
dotenv.config({
    path: './src/.env'
})

const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            process.exit(1); // Exit the process with failure
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }

}

export { connectDB};