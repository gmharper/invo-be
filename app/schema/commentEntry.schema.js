import z from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";

// ZOD
export const CommentEntryZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    type: z.string().optional(),
    body: z.string().optional(),

    author: ObjectIdSchema.optional(),
    createdAt: UnixSchema.optional(),
    updatedAt: UnixSchema.optional()
});

export class CommentEntryClass {
    constructor(input) {
        const props = CommentEntryZSchema.parse(input);
    };
};

// MONGOOSE
export const CommentEntryMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    type: String,
    body: String,

    author: { type:Schema.Types.ObjectId, ref:"User" },
    createdAt: { type:Number, default: () => Math.floor(Date.now() / 1000) },
    updatedAt: { type:Number, default: () => Math.floor(Date.now() / 1000) }
});

export const CommentEntry = model("CommentEntry", CommentEntryMSchema, "commentEntries");