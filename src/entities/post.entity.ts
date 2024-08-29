
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost {
    id: string;
    userid: mongoose.Schema.Types.ObjectId;
    title: string;
    image: string;
    tags: mongoose.Schema.Types.ObjectId[];
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number
}

export interface IPostLike {
    _id: string;
    post_id: string;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
}