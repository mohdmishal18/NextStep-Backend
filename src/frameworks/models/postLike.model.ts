import mongoose, { Document, Model } from 'mongoose';
import { IPostLike } from '../../entities/post.entity';

// Define the schema for likes
const LikeSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: true,   // Make sure post_id is required
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: true,   // Make sure user_id is required
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Bind the IPostLike interface to the LikeModel
const LikeModel = mongoose.model<IPostLike>('Likes', LikeSchema);
export default LikeModel;
