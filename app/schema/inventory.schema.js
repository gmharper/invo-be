import mongoose, { model, Schema } from "mongoose";
import { z } from "zod";
import { ObjectIdSchema, UnixSchema } from "./z.js";

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
    history: z.array(ObjectIdSchema).optional(),
    createdAt: UnixSchema.optional(),
    updatedAt: UnixSchema.optional()
});

// MONGOOSE
export const InventoryMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    name: String,
    description: { type:String, default:null },
    path: { type:String, default:null },
    icon: { type:String, default:null },
    color: String,

    columns: Number,
    slots: [{ "item":{ type:String, default:null }}],

    permissions: Number,
    collaborators: [{ type:Schema.Types.ObjectId, ref:"User" }],

    linkedFrom: { type:Schema.Types.ObjectId, ref:"Inventory" },
    clonedFrom: { type:Schema.Types.ObjectId, ref:"Inventory" },

    tags: [String],
    author: { type:Schema.Types.ObjectId, ref:"User" },
    history: [{ type:Schema.Types.ObjectId, ref:"HistoryEntry" }],
    createdAt: { type:Number, default: () => Math.floor(Date.now() / 1000) },
    updatedAt: { type:Number, default: () => Math.floor(Date.now() / 1000) }
});

export const Inventory = model("Inventory", InventoryMSchema);