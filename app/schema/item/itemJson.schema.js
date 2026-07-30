import mongoose, { model, Schema } from "mongoose";
import z from "zod";
import { ObjectIdSchema } from "../z.js";

export const ItemJsonZSchmea = z.object({
    _id: ObjectIdSchema.optional()
});

export const ItemJsonMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true }
})

export const ItemJson = model("ItemJson", ItemJsonMSchema, "itemsJson");