import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String, // Changed from Number to String to accommodate different phone number formats
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  education: {
    type: String,
    required: true, // Assuming education is a required field
  },
  bio: {
    type: String,
  },
  otpVerified: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
  },
  coverPicture: {
    type: String,
  },
  linkedinUrl: {
    type: String,
    required: true,
  },
  presentCompany: {
    type: String,
    required: true,
  },
  presentRole: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
});

const MentorModel = mongoose.model('Mentor', MentorSchema);
export default MentorModel;
