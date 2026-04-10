import mongoose, { Schema, Document } from "mongoose";

export interface IVisualization extends Document {
  taskId: string;
  status: "CREATED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  muralId: string;
  muralTitle: string;
  collectionId: string;
  collectionTitle: string;
  colorName: string;
  isPattern: boolean;
  userDescription: string;
  prompt: string;
  imageUrl: string | null;
  feedback: "up" | "down" | null;
  ip: string;
  createdAt: Date;
  completedAt: Date | null;
}

const VisualizationSchema = new Schema<IVisualization>(
  {
    taskId: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: ["CREATED", "IN_PROGRESS", "COMPLETED", "FAILED"], default: "CREATED" },
    muralId: { type: String, default: "" },
    muralTitle: { type: String, default: "" },
    collectionId: { type: String, default: "" },
    collectionTitle: { type: String, default: "" },
    colorName: { type: String, default: "" },
    isPattern: { type: Boolean, default: false },
    userDescription: { type: String, default: "" },
    prompt: { type: String, default: "" },
    imageUrl: { type: String, default: null },
    feedback: { type: String, enum: ["up", "down", null], default: null },
    ip: { type: String, default: "" },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Visualization =
  mongoose.models.Visualization || mongoose.model<IVisualization>("Visualization", VisualizationSchema);
