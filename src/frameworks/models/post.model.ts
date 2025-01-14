import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from '../../entities/post.entity';


const PostSchema = new mongoose.Schema<IPost>({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Skills',
    default: [],
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes:{
    type: Number,
    default: 0
  }, 
  isBlocked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const PostModel = mongoose.model<IPost>('Post', PostSchema);
export default PostModel;
