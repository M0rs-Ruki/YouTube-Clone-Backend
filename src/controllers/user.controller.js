
// 📄 What is user.controller.js?
    // ✅ Purpose:
    // The User Controller handles all logic related to users in your backend project.
    // ✅ Think of it like this:
    // It connects the frontend request (like signup, login, update profile) 
    // to the backend model (database operations).

// ✅ Common things inside user.controller.js:
    // Register User (POST /register)
    // Login User (POST /login)
    // Get User Details (GET /user/:id)
    // Update User Profile (PATCH /user/:id)
    // Delete User Account (DELETE /user/:id)
    // Change Password
    // Update Avatar or Cover Image
    // Manage Watch History 

// 📌 Quick Line for Your Notes:
//     User Controller = Middleman between Request and Database for User-related operations.


import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({message: "oK"})
})

export { registerUser }