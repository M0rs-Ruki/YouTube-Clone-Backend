
// 🗄️ What is the use of db/index.js?
    // db/index.js is usually created to handle database connection 
    // logic — cleanly and separately.
// 🔧 What it typically does:
    // 📡 Connects your app to a database (like MongoDB using Mongoose)
    // 🛠 Sets up any database-specific configurations (timeouts, retry strategies, etc.)
    // 🧹 Separates database logic from your main index.js (keeping your app organized)


import mongoose from "mongoose";
import { DB_NAME } from "../constante.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_NAME}`);
        
        console.log(` MogoDB connected: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`MogoDB connection error: ${error}`);
        process.exit(1)
        
    }
}

export default connectDB;