import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema } from "./z.js";

export const DashboardTabZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: z.string().optional(),
    description: z.string().optional()
});

export const DashboardTabMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    name: String,
    description: String
});

export const DashboardTab = model("DashboardTab", DashboardTabMSchema, "dashboardTabs");