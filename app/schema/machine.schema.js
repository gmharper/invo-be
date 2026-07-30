import { z } from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";

export const MachineZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: z.string().optional(),
    description: z.string().nullable().optional(),

    tags: z.array(z.string()).optional(),
    author: ObjectIdSchema.optional(),
    history: z.array(ObjectIdSchema).optional(),
    createdAt: UnixSchema.optional(),
    updatedAt: UnixSchema.optional()
});

export const MachineMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    name: String,
    description: String,
    color: String,

    tags: [String],
    author: { type:Schema.Types.ObjectId, ref:"User" },
    history: [{ type:Schema.Types.ObjectId, ref:"HistoryEntry" }],
    createdAt: { type:Number, default: () => Math.floor(Date.now() / 1000) },
    updatedAt: { type:Number, default: () => Math.floor(Date.now() / 1000) }
});

export const Machine = model("Machine", MachineMSchema);