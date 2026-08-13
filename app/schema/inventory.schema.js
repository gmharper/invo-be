import mongoose, { model, Schema } from "mongoose";
import { z } from "zod";
import { ObjectIdSchema, UnixSchema } from "./z.js";
import { ObjectId } from "mongodb";

// ZOD
export const InventoryZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    path: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    color: z.string().optional(),

    columns: z.number().optional(),
    slots: z.array({ item:z.string().nullable() }).optional(),

    permissions: z.number().optional(),
    collaborators: z.array(ObjectIdSchema).optional(),

    linkedFrom: ObjectIdSchema.nullable().optional(),
    clonedFrom: ObjectIdSchema.nullable().optional(),

    tags: z.array(z.string()).optional(),
    author: ObjectIdSchema.optional(),
    comments: z.array(ObjectIdSchema).optional(),
    history: ObjectIdSchema.optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().default(new Date())
});

// MONGOOSE
export const InventoryMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    name: { type:String, required:true },
    description: String,
    path: String,
    icon: String,
    color: String,

    columns: Number,
    slots: { type:[{ "item":{ type:String, default:null }}], required:true },

    permissions: Number,
    collaborators: [{ type:Schema.Types.ObjectId, ref:"User" }],

    linkedFrom: { type:Schema.Types.ObjectId, ref:"Inventory" },
    clonedFrom: { type:Schema.Types.ObjectId, ref:"Inventory" },

    tags: { type:[String] },
    author: { type:Schema.Types.ObjectId, ref:"User", required:true },
    comments: [{ type:Schema.Types.ObjectId, ref:"Comment" }],
    history: { type:Schema.Types.ObjectId, ref:"History", required:true },
    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, default: new Date(), required:true }
});

export const Inventory = model("Inventory", InventoryMSchema);