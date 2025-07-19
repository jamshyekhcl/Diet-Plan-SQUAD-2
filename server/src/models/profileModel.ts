import mongoose, { Schema, Document, model } from "mongoose";
import { IProfile } from "../interfaces/profileInterface";

const ProfileSchema: Schema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    heightCm: {
      type: Number,
    },
    weightCm: {
      type: Number,
    },
    dietaryPreferences: {
      type: String,
      enum: ["veg", "non-veg"],
    },
    allergies: {
      type: [String],
    },
    activityLevel: {
      type: String,
      enum: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
    },
    healthGoals: {
      type: String,
      enum: ["weight_loss", "weight_gain", "maintenance"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export default model<IProfile & Document>("profile", ProfileSchema);
