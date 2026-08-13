import z from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";

export const DashboardPanelZSchema = z.object({
    _id: z.string(),
    name: z.string(),
    type: z.string()
})

export const DashboardTabZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    panels: z.array(DashboardPanelZSchema).optional(),

    history: ObjectIdSchema.optional(),
    author: ObjectIdSchema.optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().default(new Date())
});

export const DashboardTabMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    name: String,
    description: String,
    panels: [{ _id:{ type:String, required:true}, name:{ type:String, required:true }, type:{ type:String, required:true }}],

    history: { type:Schema.Types.ObjectId, ref:"History", required:true },
    author: { type:Schema.Types.ObjectId, ref:"User", required:true },
    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, default: new Date(), required:true }
});

export const DashboardTab = model("DashboardTab", DashboardTabMSchema, "dashboardTabs");