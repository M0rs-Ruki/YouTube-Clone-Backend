
// 🧠 What is user.model.js?
    // ✅ It defines the structure (schema) of a User in your MongoDB database using Mongoose.
    // ✅ It tells MongoDB what fields a user should have and what rules those fields must follow.
    // ✅ It can also define extra functionalities like password encryption, JWT token generation, etc.

// 🔥 Visualize it like this:
// user.model.js is like telling MongoDB:
    // "Hey! Every user must have a fullName, email, and password.
    // Make sure the email is unique.
    // Also, when someone is created or updated, automatically save timestamps."

// 🏁 Super Short Summary:
    // user.model.js = blueprint of your User data in MongoDB + special 
    // powers like validation and extra features.

import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowecase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowecase: true,
    },
    avater: {
        type: String, // Cloudinary Url
        required: true,
    },
    coverImage: {
        type: String, // Cloudinary Url
        required: true,
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "video"
    }],
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    refreshToken: {
        type: String,
    }



},{timestamps: true})


export const User = mongoose.model("User", userSchema)