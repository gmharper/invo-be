import { z } from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";

export const WorkflowZSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    color: z.string().optional(),

    tags: z.array(z.string()).optional(),
    author: ObjectIdSchema,
    history: z.array(ObjectIdSchema).optional(),
    createdAt: UnixSchema.optional(),
    updatedAt: UnixSchema.optional()
});

export const WorkflowMSchema = new mongoose.Schema({
    _id: { type:String, required:true },
    name: { type:String, required:true },
    description: String,
    color: String,

    tags: [String],
    author: { type:Schema.Types.ObjectId, ref:"User" },
    history: [{ type:Schema.Types.ObjectId, ref:"HistoryEntry" }],
    createdAt: { type:Number, default: () => Math.floor(Date.now() / 1000) },
    updatedAt: { type:Number, default: () => Math.floor(Date.now() / 1000) }
});

export const Workflow = model("Workflow", WorkflowMSchema);