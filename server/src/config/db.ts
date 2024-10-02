import mongoose from "mongoose";
import { MONGO_URL } from "../constants/env";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connection successfully to DB")
    } catch (error) {
        console.error("could not connect to DB, error");
        process.exit(1)
    }
};

export default connectDB;