// 📄 What is subscription.model.js?
    // ✅ Purpose:
    // The subscription.model.js file defines the schema and structure for user subscriptions in your database using Mongoose.
    // This model helps track which user is subscribed to which other user, just like subscribing to a YouTube channel.

// 🧠 What it represents:
    // Imagine:
    // User A subscribes to User B.
    // You need to store:
    // Who subscribed (subscriber)
    // Who was subscribed to (channel)
    // When it happened (timestamp)
// 📌 Summary for Notes:
    // subscription.model.js stores info about who subscribes to whom, allowing users to follow channels like on YouTube.


import mongoose, { Schema } from "mongoose";

const subsciption = new Schema({
    subscriber: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    channel: {type: Schema.Types.ObjectId, ref: 'User', required: true}


},{timestamps: true})




export const Subsciption = mongoose.model('Subsciption', subsciption)