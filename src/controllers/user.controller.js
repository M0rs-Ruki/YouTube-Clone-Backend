
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
import jwt from "jsonwebtoken"


const generateAccessAndRefereshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return { accessToken, refreshToken }

    } catch (error) {
        throw new apiError(500, "Token generation failed")
    }
}



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
        throw new apiError(409, "User already exists")
    }

    // check for images , and check for cover images
    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    

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
    const user = await User.create({
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
    return res.status(201).json(
        new apiResponse(200, "User created successfully", createdUser)
    )

})

const loginUser = asyncHandler( async (req, res) => {

    // gat data from req.body
    // username or email
    // find the user
    // password chack
    // access and referesh token
    // send cookie
    // return response

    // gat data from req.body
    const { email, username, password } = req.body

    // username or email
    if (!(username || email)) {
        throw new apiError(400, "Username or email is required")
    }

    // find the user    
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new apiError(404, "User not found")
    }
    // password chack
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid credentials")
    }

    // access and referesh token
    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id)

    // send cookie
    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, {user: loggedInUser, accessToken, refreshToken}, "Login successful"))


})

const logoutUser = asyncHandler( async (req, res) => {

    await User.findByIdAndUpdate(req.user._id, 
        {$set: {refreshToken: undefined}},
        {new: true, }
    )
     const options = {
        httpOnly: true,
        secure: true,
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200,{}, "Logout successful"))
})

const refereshAcessToken = asyncHandler( async (req, res) => {

    const incomingRefreshToken = req.cookeies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new apiError(401, "Unauthorized access")

    }

try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new apiError(404, "User not found")
        }
        
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Refresh Token is not valid")
        }
        const options = {
            httpOnly: true,
            secure: true,
        }
        const { accessToken, newrefreshToken } = await generateAccessAndRefereshToken(user._id)
    
        return res
        .status(200)
        .cookeie("accessToken", accessToken, options)
        .cookeie("refreshToken", newrefreshToken, options)
        .json(new apiResponse(200, {user, accessToken, newrefreshToken}, "Access token refreshed successfully"))
} catch (error) {
    throw new apiError(401, error?.message || "Unauthorized access")
}
})


export { 
    registerUser,
    loginUser,
    logoutUser,
    refereshAcessToken
}