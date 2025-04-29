
// 🧠 What is utils/cloudinary.js?
    // ✅ The utils/cloudinary.js file is where you configure and set up 
    // Cloudinary to upload, delete, or manage files (like images or videos) 
    // from your Node.js backend.
    // ✅ It makes it super easy to handle file uploads in your project.

// ☁️ What's Cloudinary?
    // Cloudinary is a cloud service that stores and manages media files 
    // (images, videos, PDFs, etc.).
    // Instead of storing huge files on your server (which would make it 
    // slow and expensive), you upload them to Cloudinary.
    // Then, you just store the file's URL in your database!

// 🏁 Tiny Summary:
    // utils/cloudinary.js = Central place to connect and interact with 
    // Cloudinary for file uploads and management.

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"; // Node.js file system

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // file has been uploaded scuccessfully
        // console.log("File is uploaded successfully", response.url);
        
        fs.unlinkSync(localFilePath) // remove the local saved file 
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the local saved file 
        return null
    }
}

export { uploadOnCloudinary }

