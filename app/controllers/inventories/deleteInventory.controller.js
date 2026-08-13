// MODELS
import { deleteInventory } from "../../models/index.js";

// SCHEMA
import { Comment } from "../../schema/commentEntry.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { User } from "../../schema/user.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export default async function deleteInventoryController(req, res, next) {
    const { inventoryId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(inventoryId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid inventory ID",
            issues: parsedId.error.issues
        });
    };

    const id = parsedId.data;
    let inventory;

    return deleteInventory(id)
        .then((response) => {
            if (!response) return res.status(404).send({ err_msg: "404: Not Found" })
            
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
            return res.status(200).json({
                msg: "Inventory deleted successfully!",
                inventoryId: id,
                inventory
            });
        })
        .catch((err) => { next(err) })
};