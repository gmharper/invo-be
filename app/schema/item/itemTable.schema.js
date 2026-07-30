import mongoose, { model, Schema } from "mongoose";
import z from "zod";
import { ObjectIdSchema } from "../z.js";

export const ItemTableZSchmea = z.object({
    _id: ObjectIdSchema.optional()
});

export const ItemTableMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true }
})

export const ItemTable = model("ItemTable", ItemTableMSchema, "itemsTable");