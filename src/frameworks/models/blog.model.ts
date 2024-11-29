import mongoose, { Schema, Document, Model } from "mongoose";
import { IBlog } from "../../entities/blog.entity";

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },
    coverImage: {
      type: String,
      default: null,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skills",
        required: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.model<IBlog>("Blog", BlogSchema);
