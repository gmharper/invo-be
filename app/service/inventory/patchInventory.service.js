// MODELS
import { patchInventory } from "../../models/inventory.model.js";

// SCHEMA
import { InventoryZSchema } from "../../schema/inventory.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function patchInventoryService(inventoryId, patch) {
    const parsedId = ObjectIdSchema.safeParse(inventoryId);

    if (!parsedId.success) {
        throw new AppError("Invalid inventory ID.", 400, parsed.error.format());
    };

    const parsed = InventoryZSchema.parse(patch);

    const blacklist = [
        "_id", "permissions", "collaborators",
        "linkedFrom", "clonedFrom",
        "comments", "history", "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchInventory(parsedId.data, parsed)
        .then((inventory) => {
            if (!inventory) throw new AppError("404: Not found", 404, null);

            return inventory;
        });
};