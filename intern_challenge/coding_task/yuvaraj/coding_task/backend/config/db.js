import mongoose from "mongoose";

export const connectDB = async () => {
    const mongodbURL = process.env.BUILDENV === "dev" ? process.env.MONGODB_URL_DEV : process.env.MONGODB_URL_LIVE;
    console.log(mongodbURL, "db_Url");

    try {
        console.log("DB is connecting...");
        const res = await mongoose.connect(mongodbURL);
        console.log(`MongoDB connected with server ${res.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed!");
        console.log(error);
    }
}