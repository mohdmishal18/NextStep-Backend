import { Document, ObjectId } from "mongoose";

export default interface IMentor extends Document {
    _id: string;
    profilePicture: string;
    coverPicture?: string;
    firstName: string
    lastName: string;
    password: string;
    email: string;
    jobTitle: string;
    company: string;
    location: string;
    skills: string[] | { _id: string; name: string }[]
    bio: string;
    linkedInUrl: string;
    personalWebsiteUrl?: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
    rating: number;
    isBlocked: boolean
    status: 'pending' | 'approved' | 'rejected';
    __v: number;
}


export interface IRegisterMentor {
    profilePicture?: string;
    firstName: string
    lastName: string;
    password: string;
    email: string;
    jobTitle: string;
    company: string;
    location: string;
    // category: string;
    skills: ObjectId[];
    bio: string;
    linkedInUrl: string;
    personalWebsiteUrl?: string;
    whyBecomeMentor?: string;
    greatestAchievement?: string;
}
