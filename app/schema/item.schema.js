import mongoose, { model, Schema } from "mongoose";
import { z } from "zod";
import { ObjectIdSchema, UnixSchema } from "./z.js";
import { ObjectId } from "mongodb";

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

    linkedFrom: ObjectIdSchema.nullable().optional(),
    clonedFrom: ObjectIdSchema.nullable().optional(),
    
    text: ObjectIdSchema.nullable().optional(),
    json: ObjectIdSchema.nullable().optional(),
    table: ObjectIdSchema.nullable().optional(),

    tags: z.array(z.string()).optional(),
    author: ObjectIdSchema.optional(),
    comments: z.array(ObjectIdSchema).optional(),
    history: ObjectIdSchema.optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().default(new Date())
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

    linkedFrom: { type:Schema.Types.ObjectId, ref:"Item" },
    clonedFrom: { type:Schema.Types.ObjectId, ref:"Item" },
    
    tags: [String],
    author: { type:Schema.Types.ObjectId, ref:"User", required:true },
    comments: [{ type:Schema.Types.ObjectId, ref:"Comment" }],
    history: { type:Schema.Types.ObjectId, ref:"History", required:true },
    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, default: new Date(), required:true }
});

export const Item = model("Item", ItemMSchema);