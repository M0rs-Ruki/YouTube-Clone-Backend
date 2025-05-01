// 📄 What is user.router.js?
    // ✅ Purpose:
    // The User Router is responsible for organizing and managing all the URL routes 
    // (endpoints) related to the user, like login, signup, profile, etc.

// ✅ Think of it like this:
    // Frontend sends a request (for example: /api/v1/user/register).
    // Router checks which controller function should handle that request.
    // Controller processes the request.

// ✅ Common routes inside user.router.js:
    // POST /register → Register a new user
    // POST /login → User login
    // GET /profile → Get user profile
    // PATCH /update-profile → Update user details
    // PATCH /change-password → Change user password
    // POST /update-avatar → Update profile picture

//📌 Quick Line for Your Notes:
    // User Router = Defines URL paths and connects them to the correct controller functions.

    
import { Router } from "express";
import { logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js"
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { refereshAcessToken } from "../controllers/user.controller.js";



const router = Router()

router.route("/register").post(

    upload.fields(
        [
            {name: "avatar", maxCount: 1},
            {name: "coverImage", maxCount: 1}
        ]
    ),
    registerUser

)
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post( verifyJWT ,logoutUser)
router.route("/refresh-token").post(refereshAcessToken)

export default router;