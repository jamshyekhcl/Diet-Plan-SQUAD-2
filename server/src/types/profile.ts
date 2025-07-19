import mongoose from "mongoose";

export type TCreateProfileBody = {
  userId: mongoose.Types.ObjectId;
  heightCm: number;
  weightCm: number;
  dietaryPreferences: string;
  allergies: string;
  activityLevel: string;
  healthGoals: string;
};
