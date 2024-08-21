import mongoose from "mongoose";

import IMentee from "../../entities/mentee.entity";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
    },
    bio: {
        type: String,
    },
    education: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    coverPicture: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "mentee"
    },
    otpVerified: {
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.model<IMentee>('Users',UserSchema)
export default UserModel