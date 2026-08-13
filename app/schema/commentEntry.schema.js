import z from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";

// ZOD
export const CommentZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    refId: ObjectIdSchema.optional(),
    type: z.string().optional(),
    body: z.string().optional(),
    replies: z.array(ObjectIdSchema).optional(),

    author: ObjectIdSchema.optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().default(new Date())
});

// MONGOOSE
export const CommentMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    refId: { type:Schema.Types.ObjectId, required:true },
    type: { type:String, required:true },
    body: String,
    replies: [{ type:Schema.Types.ObjectId, ref:"Comment" }],

    author: { type:Schema.Types.ObjectId, ref:"User", required:true },
    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, default: new Date(), required:true }
});

export const Comment = model("Comment", CommentMSchema, "comments");