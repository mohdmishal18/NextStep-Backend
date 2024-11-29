import mongoose, { Document } from "mongoose";

export interface IBlog extends Document {
    _id: string;
    title: string;
    content: string;
    authorId: mongoose.Schema.Types.ObjectId;
    coverImage?: string;
    tags?: mongoose.Schema.Types.ObjectId[];
    isPublished: boolean; 
    createdAt?: Date; 
    updatedAt?: Date;
}