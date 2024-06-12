import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const mongoURI = process.env.MONGO_URI

// connect to the atlas cluster
const connectDb = () =>{
    mongoose.connect(mongoURI)
    mongoose.connection.on("connected", () =>{
        console.log("Successfully connected to the atlas cluster");
    })
    mongoose.connection.on("disconnected", () =>{
        console.log("Disconnected from the database");
    })
    mongoose.connection.on("error", () =>{
        console.log("Error connecting to the cluster");
    })
}

export default connectDb