import { Document } from "mongoose";

export default interface IMentee {
    _id: string;
    name: string;
    email: string;
    phone: Number;
    password: string;
    role: string
    profilePicture?: string;
    coverPicture?: string;
    isBlocked?: boolean;
    otpVerified?: boolean
}

export interface IRegisterMentee {
    name: string;
    email: string;
    phone: Number;
    password: string;
    role: string
}