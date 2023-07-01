import mongoose from "mongoose";

export default function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to mongoose successfully");
        })

        connection.on('error', (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running..." + err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}