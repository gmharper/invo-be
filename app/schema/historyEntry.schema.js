import z from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";

// ZOD
export const HistoryEntryZSchema = z.object({
    author: ObjectIdSchema,
    action: z.string(),
    body: z.string().optional(),
    previous: z.string().optional(),
    new: z.string().optional(),
    timestamp: z.coerce.date().default(new Date())
});

export const HistoryZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    refId: ObjectIdSchema.optional(),
    type: z.string().optional(),
    entries: z.array(HistoryEntryZSchema).optional(),

    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().default(new Date())
});


// MONGOOSE
export const HistoryMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    refId: { type:Schema.Types.ObjectId, required:true },
    type: { type: String, required:true },
    entries: [
        { 
            author:{ type:Schema.Types.ObjectId, required:true }, 
            action:{ type:String, required:true }, 
            body:{ type:String }, 
            previous: String, 
            new: String, 
            timestamp:{ type:Date, required:true }
        }
    ],

    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, default: new Date(), required:true }
});

export const History = model("History", HistoryMSchema, "histories");