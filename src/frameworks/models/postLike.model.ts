import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true});

const LikeModel = mongoose.model('Like', LikeSchema);
export default LikeModel;
