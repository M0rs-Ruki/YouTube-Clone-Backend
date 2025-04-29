
// ⚡ What is apiResponse.js?
    // apiResponse.js is a utility you create to standardize 
    // successful responses in your backend.
    // ✅ Instead of sending random messy responses everywhere, you send 
    // a clean, predictable, and beautiful JSON format.

// 🧩 Summary:
    // apiResponse.js = A standard response format for all successful backend 
    // API operations — makes your app feel clean, predictable, and professional.


// HTTP response status codes
    // 1. Informational responses (100-199)
    // 2. Successful responses (200-299)
    // 3. Redirection messages (300-399)
    // 4. Client error responses (400-499)
    // 5. Server error responses (500-599)

class apiResponse{
    constructor(statusCode, message = "success", data){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode === 400 ? false: true
    }
}

export { apiResponse }