// MODELS
import { getInventories, getInventory } from "../../models/inventory.model.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getInventoriesService(query) {
    const parsed = queryValidationSchema.safeParse(query);

    if (!parsed.success) {
        throw new AppError("Invalid query.", 400, parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'filled', 'slots', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        throw new AppError("Invalid sort query.", 400, null);
    };

    return getInventories({ ...parsed.data })
        .then((data) => {
            if (!data || !data.inventories) throw new AppError("404: Not found", 404, null);
            
            return data;
        });
};


export async function getInventoryService(inventoryId) {
    const parsedId = ObjectIdSchema.safeParse(inventoryId);
    if (!parsedId.success) {
        throw new AppError("Invalid inventory ID.", 400, parsedId.error.format());
    };

    return getInventory(parsedId.data)
        .then((inventory) => {
            if (!inventory) throw new AppError("404: Not found", 404, null);

            return inventory;
        });
};