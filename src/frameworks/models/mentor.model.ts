import mongoose, { Schema } from "mongoose";
import IMentor from "../../entities/mentor.entity";

const mentorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String,
    default: null // Assuming the image URL or file path will be stored
  },
  coverPicture: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  // category: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  skills: [{
    type: Schema.Types.ObjectId,
    ref: 'Skills',  // Make sure your collection is actually named 'Skills'
    required: true
}],
  bio: {
    type: String,
    required: true,
    trim: true
  },
  linkedInUrl: {
    type: String,
    trim: true
  },
  personalWebsiteUrl: {
    type: String,
    trim: true
  },
  whyBecomeMentor: {
    type: String,
    required: true,
    trim: true
  },
  greatestAchievement: {
    type: String,
    required: true,
    trim: true
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});


const MentorModel = mongoose.model<IMentor>('Mentor', mentorSchema);
export default MentorModel;
