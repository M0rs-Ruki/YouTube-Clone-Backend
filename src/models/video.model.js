
// 🧠 What is video.model.js?
    // ✅ It defines the structure (schema) for videos in your MongoDB database.
    // ✅ It tells MongoDB what properties each video should have (like title, description, URL, uploader, etc.).
    // ✅ It makes it super easy to create, find, update, and delete videos using Mongoose methods.

// 📺 Think of it like this:
    // video.model.js is telling MongoDB:
    // "Hey! Every video should have a title, video file URL, and should belong to a user who uploaded it.
    // You can also keep track of views, likes, and timestamps."

// 🏁 Super Short Summary:
    // video.model.js = blueprint for all videos uploaded on your platform, 
    // including details like title, uploader, URL, views, and likes.

import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({
    
    videoFile: {
        type: String, // Cloudinary url
        required: true
    },
    thumbnail: {
        type: String, // Cloudinary url
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }


},{timestamps: true})


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)