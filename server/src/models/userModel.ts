import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

export type roles = "admin" | "user";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", userSchema);
