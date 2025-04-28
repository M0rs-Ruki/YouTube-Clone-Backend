
// 🏁 What is the use of index.js?
// In most Node.js projects, index.js serves as the entry point—the
// very first file that runs when you start your backend app.

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({path: "./env"});


connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed", error );
    
})









// import express from "express";
// const app = express();
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGOODB_URI} / ${DB_NAME}`)
//         app.on("error", () => {
//             console.log("ERROR", error);
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("ERROR", error);
//         throw error
        
//     }
// })()