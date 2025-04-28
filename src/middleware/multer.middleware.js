// 🧠 What is multer.middleware.js?
    // ✅ multer.middleware.js is where you configure and set up the Multer library.
    // ✅ Multer is a middleware that helps your Node.js server accept file uploads 
    // — like images, videos, PDFs, etc.

// 📂 What is Multer?
    // Multer is a package for handling multipart/form-data, which is the form encoding type used for uploading files.
    // It parses the file from the user's upload and attaches it to req.file or req.files in your controller.
    // Without Multer, your server wouldn't know how to "read" file uploads.

// 🏁 Tiny Summary:
    // multer.middleware.js = Custom setup for handling file uploads (storage, size, filter)
    // Makes uploading things like profile pictures, thumbnails, videos very easy in Node.js.

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage, })