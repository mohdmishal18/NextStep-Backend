import mongoose from "mongoose";

import IMentee from "../../entities/mentee.entity";
import { deflate } from "zlib";

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
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
    },
    education: {
        type: String,
    },
    profilePicture: {
        type: String,
        reqiured: true
    },
    coverPicture: {
        type: String,
        reqired: true
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