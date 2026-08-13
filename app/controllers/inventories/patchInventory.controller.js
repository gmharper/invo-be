// MODELS
import { patchInventory } from "../../models/index.js";

// SCHEMA
import { InventoryZSchema } from "../../schema/inventory.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export default async function patchInventoryController(req, res, next) {
    const { inventoryId } = req.params;
    const data = req.body;

    const parsedId = ObjectIdSchema.safeParse(inventoryId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid inventory ID",
            issues: parsed.error.issues
        });
    };

    const parsed = InventoryZSchema.parse(data);

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
            if (!inventory) return res.status(404).send({ err_msg: "404: Not Found" });

            return res.status(200).json({ 
                msg: "Inventory patched successfully!",
                inventory 
            });
        })
        .catch((err) => { next(err) })
};