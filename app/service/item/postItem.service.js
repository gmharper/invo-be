// MODELS
import { postItem } from "../../models/item.model.js";

// SCHEMA
import { History } from "../../schema/historyEntry.schema.js";
import { ItemZSchema } from "../../schema/item.schema.js";
import { AppError } from "../../schema/AppError.js";
import { ObjectId } from "mongodb";

export async function postItemService(item) {
    const parsed = ItemZSchema.safeParse(item);
    
    if (!parsed.success) {
        throw new AppError("Error parsing posted item.", 400, parsed.error.format());
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdItem = { ...parsed.data };

    return postItem(createdItem)
        .then((data) => {
            if (!data) return;
            
            return History.create({
                _id: historyId,
                refId: createdItem._id,
                type: "item",
                entries: [
                    { author:createdItem.author, action:"ITEM_CREATED", body:"", timestamp:createdItem.createdAt }
                ],
                createdAt: createdItem.createdAt,
                updatedAt: createdItem.updatedAt
            });
        })
        .then((history) => {
            return createdItem;
        })
};