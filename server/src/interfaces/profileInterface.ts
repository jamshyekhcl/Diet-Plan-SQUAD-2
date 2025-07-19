import mongoose from "mongoose";

export interface IProfile {
  _id?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  heightCm?: number;
  weightCm?: number;
  dietaryPreferences?: "veg" | "non-veg";
  allergies?: string[];
  activityLevel?: "Sedentary" | "Light" | "Moderate" | "Active" | "Very Active";
  healthGoals?: "weight_loss" | "weight_gain" | "maintenance";
  createdAt?: Date;
  updatedAt?: Date;
}
