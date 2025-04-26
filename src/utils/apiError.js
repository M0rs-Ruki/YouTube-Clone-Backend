

// ⚡ What is apiError.js inside utils/?
    // apiError.js is a utility class you create to customize error handling in your backend.
    // Instead of sending random error messages all over your app, you can throw 
    // a neat, clean, and consistent error object using apiError.

// 🧠 In simple words:
    // Without apiError, you might send confusing errors like:
    // "Something went wrong"
    // "Internal server error"

// ✅ With apiError, you can control exactly:
    // Error message
    // Error status code
    // Extra details (if needed)

class apiError extends Error{
    constructor(
        statusCode, 
        message = 'Something went wrong', 
        errors = [], 
        stack = ''
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.sucess = false
        this.errors = errors
        if(stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export { apiError }