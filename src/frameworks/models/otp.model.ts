import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp:{
        type:String,
        required:true
    },
},{timestamps:true});

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

export const OtpModel = mongoose.model("Otp",OtpSchema)