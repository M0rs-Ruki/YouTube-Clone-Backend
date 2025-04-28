
// ⚡ What is app.js?
    // app.js is where you create and configure your Express application 
    // — but you don't start the server here.
    // You just set up the app: routes, middleware, error handling, parsers, etc.

// 🛠 Typical responsibilities of app.js:
    // 📦 Initialize Express (const app = express())
    // 🛡️ Apply middleware like express.json(), cookie-parser, cors, etc.
    // 🔗 Mount all routes (controllers and routers)
    // 🧯 Setup error handlers
    // 📂 Serve static files if needed (like images, uploads)

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.envCORA_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kd"}))
app.use(express.urlencoded({extended: true, limit: "16kd"}))
app.use(express.static("public"))
app.use(cookieParser())


// routers

import userRouter from "./routers/user.routers.js";

// routers declaration 

app.use("/api/v1/user", userRouter)


// http:/localhost:8080/api/v1/user
export { app }