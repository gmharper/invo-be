import mongoose, { model, Schema } from "mongoose";
import { UnixSchema } from "./z.js";

export const UserPreferenceSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    userId: { type:Schema.Types.ObjectId, ref:'User', required:true },
    theme: String,
    keepLoggedIn: Boolean,
    sendEmailNotifications: Boolean,
    showEmail: Boolean,
    showPhone: Boolean,

    updatedAt:UnixSchema
});

export const UserPreference = model("UserPreference", UserPreferenceSchema, "userPreferences");