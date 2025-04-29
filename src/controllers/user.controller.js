
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
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";



console.log("user.controller.js");

const registerUser = asyncHandler( async (req, res) => {

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username or email
    // check for images , and check for cover images
    // upload them to cloudinary, avatar
    // create user object - create entry in DB 
    // remonve password and refresh token from user field from respons
    // check for user creation 
    // return response 

    const { username, email, password, fullName } = req.body
    console.log( email, password);

    // validation - not empty
    // if(fullName == "") {
    //     throw new apiError(400,"Full name is required")
    // }
    // OR
    if (
        [username, email, password, fullName].some((field) => field?.trim() == "")
    ) {
        throw apiError(400, "All fields are required");
    }
    
    // check if user already exists: username or email
    const existingUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existingUser) {
        throw apiError(409, "User already exists")
    }

    // check for images , and check for cover images
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath) {
        throw new apiError(400, "Avatar is required")
    }

    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new apiError(400, "Avatar upload failed")
    }
    // create user object - create entry in DB 
    const user = awaitUser.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password
    })
    // remonve password and refresh token from user field from respons  
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // check for user creation 
    if (!createdUser) {
        throw new apiError(500, "User creation failed")
    }
    // return response
    return res.statud(201).json(
        new apiResponse(200, "User created successfully", createdUser)
    )

})

export { registerUser }