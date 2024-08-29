import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Comment
export interface IComment extends Document {
  user: mongoose.Types.ObjectId;  // Reference to the User who made the comment
  post: mongoose.Types.ObjectId;  // Reference to the Post on which the comment was made
  content: string;  // The content of the comment
  createdAt: Date;  // Timestamp of when the comment was created
}

// Define the Comment Schema
const CommentSchema: Schema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',  // Reference to the User collection
    required: true
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',  // Reference to the Post collection
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Comment Model
const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);
export default CommentModel;