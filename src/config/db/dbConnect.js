import mongoose from "mongoose";

const connectDB = async () => {
    try {
        var con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to MongoDB via Docker`);
    } catch (err) {
        console.error('Connection error:', err.message);
        process.exit(1);
    }
};

export default connectDB;