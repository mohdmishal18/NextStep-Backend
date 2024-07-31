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
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    otpVerified: {
        type: Boolean,
        default: false
    }
})

export const UserModel = mongoose.model<IMentee>('Users',UserSchema)