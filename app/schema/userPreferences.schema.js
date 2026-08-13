import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";
import z from "zod";

export const UserPreferencesZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    refId: ObjectIdSchema.optional(),
    theme: z.enum(["dark", "light"]).optional(),
    keepLoggedIn: z.boolean().optional(),
    sendEmailNotifications: z.boolean().optional(),
    showEmail: z.boolean().optional(),
    showPhone: z.boolean().optional(),

    createdAt:z.coerce.date().optional(),
    updatedAt:z.coerce.date().default(new Date())
});

export const defaultUserPreferences = {
    theme: "dark",
    keepLoggedIn: false,
    sendEmailNotifications: false,
    showEmail: false,
    showPhone: false
};

export const UserPreferencesMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    refId: { type: Schema.Types.ObjectId, ref:"User", required:true },
    theme: String,
    keepLoggedIn: Boolean,
    sendEmailNotifications: Boolean,
    showEmail: Boolean,
    showPhone: Boolean,

    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, default: new Date(), required:true }
});

export const UserPreferences = model("UserPreferences", UserPreferencesMSchema, "userPreferences");