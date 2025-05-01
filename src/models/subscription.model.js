


import mongoose, { Schema } from "mongoose";

const subsciption = new Schema({
    subscriber: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    channel: {type: Schema.Types.ObjectId, ref: 'User', required: true}


},{timestamps: true})




export const Subsciption = mongoose.model('Subsciption', subsciption)