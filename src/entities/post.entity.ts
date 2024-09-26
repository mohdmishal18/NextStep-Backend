
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost {
    _id: string;
    userid: mongoose.Schema.Types.ObjectId;
    title: string;
    image: string;
    tags: mongoose.Schema.Types.ObjectId[];
    content: string;
    likes: number
}

// export interface ISave extends Document{
//     user_id: string,
//     post_id: string | IPost
// }

// Define the interface for likes
export interface IPostLike extends Document {
    user_id: string;  // The ID of the user who liked the post
    post_id: string;  // The ID of the post that was liked
  }