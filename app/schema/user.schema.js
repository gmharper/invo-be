import { z } from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";

export const UserZSchema = z.object({
    _id: ObjectIdSchema.optional(),
    username: z.string().optional(),
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    color1: z.string().optional(),
    color2: z.string().optional(),
    email: z.string().email().optional(),
    alternateEmail: z.string().email().nullable().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),

    createdAt: UnixSchema.optional(),
    updatedAt: UnixSchema.optional()
});

export const UserMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    username: { type:String, required:true },
    name: { type:String, required:true },
    description: { type:String, default:null },
    icon: { type:String, default:null },
    color1: String,
    color2: String,
    email: { type:String, required:true, select:false },
    alternateEmail: { type:String, select:false, default:null },
    phone: { type:String, select:false },
    passwordHash: { type:String, required:true, select:false },
    country: { type:String, select:false },

    userPreferences: { type:String, ref:'UserPreference'},
    links: [
        { "type":String, "value":String }
    ],
    savedUrls: [
        { "url":String, "name":String, "description":String }
    ],
    dashboardTabs: [
        { type:Schema.Types.ObjectId, ref:'DashboardTab' }
    ],

    inventories: [{ type:Schema.Types.ObjectId, ref:'Inventory' }],
    items: [{ type:Schema.Types.ObjectId, ref:'Item' }],
    machines: [{ type:Schema.Types.ObjectId, ref:'Machine' }],
    workflows: [{ type:Schema.Types.ObjectId, ref:'Workflow' }],

    linkedInventories: [{ type:Schema.Types.ObjectId, ref:'Inventory' }],
    linkedItems: [{ type:Schema.Types.ObjectId, ref:'Item' }],
    linkedMachines: [{ type:Schema.Types.ObjectId, ref:'Machine' }],
    linkedWorkflows: [{ type:Schema.Types.ObjectId, ref:'Workflow' }],

    favourites: {
        inventories: [{ type:Schema.Types.ObjectId, ref:'Inventory' }],
        items: [{ type:Schema.Types.ObjectId, ref:'Item' }],
        machines: [{ type:Schema.Types.ObjectId, ref:'Machine' }],
        workflows: [{ type:Schema.Types.ObjectId, ref:'Workflow' }]
    },

    createdAt: { type:Number, default: () => Math.floor(Date.now() / 1000) },
    updatedAt: { type:Number, default: () => Math.floor(Date.now() / 1000) }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.passwordHash;
      return ret;
    }
  },
  toObject: {
    transform(doc, ret) {
      delete ret.passwordHash;
      return ret;
    }
  }
});

export const User = model("User", UserMSchema);