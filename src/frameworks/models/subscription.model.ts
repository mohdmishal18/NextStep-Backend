import mongoose, { Schema, Model } from 'mongoose';
import { ISubscription } from "../../entities/subscription.entity";

// Define the schema with explicit typing
const MentorSubscriptionSchema: Schema<ISubscription> = new Schema(
  {
    mentorId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Mentor", 
      required: true 
    },
    type: { 
      type: String, 
      enum: ["lite", "standard", "pro"],
      required: true 
    },
    price: { 
      type: Number, 
      required: true, 
      default: 140 
    },
    duration: { 
      type: Number, 
      required: true, 
      default: 1 
    },
    features: {
      audioCalls: {
        callsPerMonth: { 
          type: Number, 
          required: true, 
          default: 1 
        },
        callDuration: { 
          type: Number, 
          required: true, 
          default: 30 
        }
      },
      videoCalls: {
        callsPerMonth: { 
          type: Number, 
          required: true, 
          default: 1 
        },
        callDuration: { 
          type: Number, 
          required: true, 
          default: 30 
        }
      },
      chatAccess: { 
        type: Boolean, 
        required: true, 
        default: true 
      },
      chatResponseTime: { 
        type: String, 
        required: true, 
        default: "3-4 days" 
      },
      blogAccess: { 
        type: Boolean, 
        required: true, 
        default: false 
      }
    }
  },
  { 
    timestamps: true 
  }
);

// Pre-save hook with correct typing
MentorSubscriptionSchema.pre("save", async function (next) {
  const subscription = this as ISubscription;
  const existingSubscriptions = await mongoose.models.MentorSubscription.countDocuments({ 
    mentorId: subscription.mentorId 
  });
  
  if (existingSubscriptions >= 3) {
    return next(new Error("A mentor can only have up to 3 subscriptions (lite, standard, pro)."));
  }
  
  next();
});

// Correctly define the model with explicit typing
const SubscriptionModel: Model<ISubscription> = mongoose.model<ISubscription>(
  "MentorSubscription", 
  MentorSubscriptionSchema
);

export default SubscriptionModel;