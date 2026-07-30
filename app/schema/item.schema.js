import mongoose, { model, Schema } from "mongoose";
import { z } from "zod";
import { ObjectIdSchema, UnixSchema } from "./z.js";

// ZOD SCHEMA
export const ItemZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    color: z.string().optional(),
    path: z.string().nullable().optional(),
    type: z.string().optional(),
    
    progress: z.number().optional(),
    permissions: z.number().optional(),
    priority: z.number().optional(),
    
    text: ObjectIdSchema.nullable().optional(),
    json: ObjectIdSchema.nullable().optional(),
    table: ObjectIdSchema.nullable().optional(),

    comments: z.array(ObjectIdSchema).optional(),
    
    tags: z.array(z.string()).optional(),
    author: ObjectIdSchema.optional(),
    history: z.array(ObjectIdSchema).optional(),
    createdAt: UnixSchema.optional(),
    updatedAt: UnixSchema.optional()
});

// MONGOOSE SCHEMA
export const ItemMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    name: String,
    description: { type:String, default:null },
    icon: { type:String, default:null },
    color: String,
    path: { type:String, default:null },
    type: String,
    
    progress: Number,
    permissions: Number,
    priority: Number,
    
    text: { type:Schema.Types.ObjectId, ref:"ItemText", default:null },
    json: { type:Schema.Types.ObjectId, ref:"ItemJson", default:null },
    table: { type:Schema.Types.ObjectId, ref:"ItemTable", default:null },
    
    tags: [String],
    author: { type:Schema.Types.ObjectId, ref:"User" },
    comments: [{ type:Schema.Types.ObjectId, ref:"CommentEntry"}],
    history: [{ type:Schema.Types.ObjectId, ref:"HistoryEntry"}],
    createdAt: { type:Number, default: () => Math.floor(Date.now() / 1000) },
    updatedAt: { type:Number, default: () => Math.floor(Date.now() / 1000) }
});

export const Item = model("Item", ItemMSchema);