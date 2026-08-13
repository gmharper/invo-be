import { z } from "zod";
import mongoose, { model, Schema } from "mongoose";
import { ObjectIdSchema, UnixSchema } from "./z.js";
import { ObjectId } from "mongodb";

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
    passwordHash: z.string().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),

    preferences: ObjectIdSchema.optional(),
    links: z.array({ type:z.string(), value:z.string() }).optional(),
    savedUrls: z.array({ url:z.string(), name:z.string(), description:z.string() }).optional(),
    dashboardTabs: z.array(ObjectIdSchema).optional(),

    inventories: z.array(ObjectIdSchema).optional(),
    items: z.array(ObjectIdSchema).optional(),
    machines: z.array(ObjectIdSchema).optional(),
    workflows: z.array(ObjectIdSchema).optional(),

    linkedInventories: z.array(ObjectIdSchema).optional(),
    linkedItems: z.array(ObjectIdSchema).optional(),
    linkedMachines: z.array(ObjectIdSchema).optional(),
    linkedWorkflows: z.array(ObjectIdSchema).optional(),

    favourites: z.object({
      inventories: z.array(ObjectIdSchema),
      items: z.array(ObjectIdSchema),
      machines: z.array(ObjectIdSchema),
      workflows: z.array(ObjectIdSchema)
    }).optional(),

    history: ObjectIdSchema.optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().default(new Date())
});

export const UserMSchema = new mongoose.Schema({
    _id: { type:Schema.Types.ObjectId, required:true },
    username: { type:String, required:true },
    name: String,
    description: { type:String, default:null },
    icon: { type:String, default:null },
    color1: String,
    color2: String,
    email: { type:String, required:true, select:false },
    alternateEmail: { type:String, select:false, default:null },
    passwordHash: { type:String, required:true, select:false },
    phone: { type:String, select:false },
    country: { type:String, select:false },

    preferences: { type:String, ref:'UserPreferences', required:true },
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

    comments: [{ type:Schema.Types.ObjectId, ref:"Comment" }],
    history: { type:Schema.Types.ObjectId, ref:'History', required:true },
    createdAt: { type:Date, required:true },
    updatedAt: { type:Date, default: new Date(), required:true }
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