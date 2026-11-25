// MODELS
import { deleteInventory } from "../../models/inventory.model.js";

// SCHEMA
import { User } from "../../schema/user.schema.js";
import { Comment } from "../../schema/commentEntry.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function deleteInventoryService(inventoryId) {
    const parsedId = ObjectIdSchema.safeParse(inventoryId);
    
    if (!parsedId.success) {
        throw new AppError("Invalid inventory ID.", 400, parsedId.error.format());
    };

    const id = parsedId.data;
    let inventory;

    return deleteInventory(id)
        .then((response) => {
            if (!response) return;
            
            inventory = response;

            return User.updateOne(
                { _id: inventory.author },
                { $pull: { inventories: inventory._id }},
                { $pull: { "favourites.inventories": inventory._id }}
            );
        })
        .then(() => {
            return Comment.deleteMany({ _id: { $in:inventory.comments }})
        })
        .then(() => {
            return History.deleteOne({ _id: inventory.history });
        })
        .then(() => {
            return inventory;
        })
};