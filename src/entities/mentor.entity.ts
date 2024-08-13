import { Document } from "mongoose";

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
    category: string;
    skills: string;
    bio: string;
    linkedInUrl: string;
    personalWebsiteUrl?: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
    isApproved: boolean;
    __v: number;
}


export interface IRegisterMentor {
    profilePicture: string;
    firstName: string
    lastName: string;
    password: string;
    email: string;
    jobTitle: string;
    company: string;
    location: string;
    category: string;
    skills: string;
    bio: string;
    linkedInUrl: string;
    personalWebsiteUrl?: string;
    whyBecomeMentor?: string;
    greatestAchievement?: string;
}
