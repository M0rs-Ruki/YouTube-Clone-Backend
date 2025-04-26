
// ⚡ What is a utility asyncHandler?
    // In Express, if you have async functions inside your routes 
    // (for example, database calls), and something goes wrong 
    // (error happens), you must manually catch errors or your app will crash.
    // ✅ asyncHandler is a utility function that automatically catches errors 
    // from async functions and sends them to Express's error-handling system.

// 🚀 In short:
    // asyncHandler = Safe + Clean async error handling

// 🧠 Why we need it:
    // Without asyncHandler, you'd have to write try/catch blocks 
    // in every single controller:



const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export { asyncHandler }


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next))
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }