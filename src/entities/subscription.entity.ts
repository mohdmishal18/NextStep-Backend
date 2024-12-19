import mongoose, { Document } from 'mongoose';

// Define the interface for the subscription
export interface ISubscription extends Document {
  mentorId: mongoose.Types.ObjectId; // Reference to the mentor
  type: "lite" | "standard" | "pro"; // Type of subscription
  price: number; // Subscription price in USD
  duration: number; // Default duration in months (e.g., 1 month)
  features: {
    audioCalls: {
      callsPerMonth: number; // Number of audio calls allowed per month
      callDuration: number; // Audio call duration in minutes
    };
    videoCalls: {
      callsPerMonth: number; // Number of video calls allowed per month
      callDuration: number; // Video call duration in minutes
    };
    chatAccess: boolean; // Unlimited Q&A via chat
    chatResponseTime: string; // Expected chat response time
    blogAccess: boolean; // Access to blogs
  };
}
