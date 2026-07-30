import mongoose, { model, Schema } from "mongoose";
import z from "zod";
import { ObjectIdSchema } from "../z.js";

export const ItemTextZSchmea = z.object({
    _id: ObjectIdSchema.optional()
});

export const ItemTextMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true }
})

export const ItemText = model("ItemText", ItemTextMSchema, "itemsText");