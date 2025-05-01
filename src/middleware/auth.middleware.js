

// 🔐 What is auth.middleware.js?
// ✅ Purpose:
    // The auth.middleware.js file contains middleware functions used to protect 
    // private routes by verifying user authentication (usually with a JWT token).

// ✅ Why we use it:
    // Some routes (like uploading a video, commenting, updating profile, etc.) should only be accessible to logged-in users.
    // This middleware checks the user's token and lets the request through only if valid.

// 📌 Summary for Notes:
//     auth.middleware.js = Verifies user JWT token and protects private routes.


import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
            if (!token) {
                throw new apiError(401, "Unauthorized request")
                
            }
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
            if (!user) {
                throw new apiError(401, "Invalid Access Token")
            }
            req.user = user
            next()
    } catch (error) {
        throw new apiError(401, error?.message,"Unauthorized request")
    }

})