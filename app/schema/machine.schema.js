import { z } from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";
import { ObjectId } from "mongodb";

export const MachineZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: z.string().optional(),
    description: z.string().nullable().optional(),

    tags: z.array(z.string()).optional(),
    author: ObjectIdSchema.optional(),
    comments: z.array(ObjectIdSchema).optional(),
    history: ObjectIdSchema.optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().default(new Date())
});

export const MachineMSchema = new mongoose.Schema({
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

export const Machine = model("Machine", MachineMSchema);