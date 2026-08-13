import { z } from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";
import { ObjectId } from "mongodb";

export const WorkflowNodeSchema = z.object({
    _id: z.string().optional(),
    name: z.string().optional(),
    operation: z.string().optional(),
    type: z.string().optional(),
    position: z.object({ x:z.number(), y:z.number() }).optional()
});

export const WorkflowZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),

    nodes: z.array(WorkflowNodeSchema).optional(),

    tags: z.array(z.string()).optional(),
    author: ObjectIdSchema.optional(),
    comments: z.array(ObjectIdSchema).optional(),
    history: ObjectIdSchema.optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().default(new Date())
});

export const WorkflowMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    name: { type:String, required:true },
    description: String,
    color: String,

    tags: [String],
    author: { type:Schema.Types.ObjectId, ref:"User", required:true },
    comments: [{ type:Schema.Types.ObjectId, ref:"Comment" }],
    history: { type:Schema.Types.ObjectId, ref:"History", required:true },
    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, default: new Date(), required:true }
});

export const Workflow = model("Workflow", WorkflowMSchema);