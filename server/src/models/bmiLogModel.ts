import mongoose, { Schema, Document } from "mongoose";

export interface IBmiLog extends Document {
  userId: string;
  weightCm: number;
  heightCm: number;
  category: "under-weight" | "normal" | "over-weight" | "obese";
  bmi: number;
  createdAt?: Date;
}

const BmiLogSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    weightCm: { type: Number, required: true },
    heightCm: { type: Number, required: true },
    category: {
      type: String,
      enum: ["under-weight", "normal", "over-weight", "obese"],
    },
    bmi: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IBmiLog>("BmiLog", BmiLogSchema);
