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
    }
})

export const UserModel = mongoose.model<IMentee>('Users',UserSchema)