import mongoose, { Document } from "mongoose";

export default interface IMentee {
    _id: string;
    name: string;
    email: string;
    phone: Number;
    password: string;
    role: string;
    education: string
    interests?: mongoose.Schema.Types.ObjectId[];
    bio: string;
    profilePicture?: string;
    coverPicture?: string;
    isBlocked: boolean;
    otpVerified?: boolean
}

export interface IRegisterMentee {
    name: string;
    email: string;
    profilePicture?: string;
    phone?: Number;
    password?: string;
    role?: string
}

export interface editMenteeDetails {
    fullName: string;
    email: string;
    phone: string;
    education: string;
    bio: string;
}

export interface ILikedUser{
    _id:string,
    username: string,
    isMutualFollow: boolean,
}