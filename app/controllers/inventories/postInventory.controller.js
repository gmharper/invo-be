// MODELS
import { postInventory } from "../../models/index.js";

// SCHEMA
import { History } from "../../schema/historyEntry.schema.js";
import { InventoryZSchema } from "../../schema/inventory.schema.js";
import { ObjectId } from "mongodb";

export default async function postInventoryController(req, res, next) {
    const data = req.body;

    const parsed = InventoryZSchema.safeParse(data);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Error parsing posted inventory",
            error: parsed.error.issues
        });
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdInventory = { ...parsed.data };

    return postInventory(createdInventory)
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            
            return History.create({
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
            if (!history) return;

            return res.status(201).json({
                msg: "Inventory created successfully!",
                inventory: createdInventory,
                history
            });
        })
        .catch((err) => { next(err) });
};