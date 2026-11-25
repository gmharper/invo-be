// MODELS
import { postInventory } from "../../models/inventory.model.js";

// SCHEMA
import { InventoryZSchema } from "../../schema/inventory.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { AppError } from "../../schema/AppError.js";
import { ObjectId } from "mongodb";

export async function postInventoryService(inventory) {
    const parsed = InventoryZSchema.safeParse(inventory);
    
    if (!parsed.success) {
        throw new AppError("Error parsing posted inventory.", 400, parsed.error.format());
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdInventory;

    return postInventory(parsed.data)
        .then((data) => {
            if (!data) return;

            createdInventory = data;
            
            History.create({
                _id: historyId,
                refId: createdInventory._id,
                type: "inventory",
                entries: [
                    { author:createdInventory.author, action:"INVENTORY_CREATED", body:"", timestamp:createdInventory.createdAt }
                ],
                createdAt: createdInventory.createdAt,
                updatedAt: createdInventory.updatedAt
            });
        })
        .then((history) => {
            return createdInventory;
        });
};