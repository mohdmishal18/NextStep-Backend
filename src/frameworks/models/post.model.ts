import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from '../../entities/post.entity';

// interface IPost extends Document {
//   _id: string
//   userid: mongoose.Schema.Types.ObjectId;
//   title: string;
//   tags: mongoose.Schema.Types.ObjectId[];
//   image: string;
//   content: string;
//   likes: mongoose.Schema.Types.ObjectId[];
// }



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
  }
}, { timestamps: true });

const PostModel = mongoose.model<IPost>('Post', PostSchema);
export default PostModel;
