import { ObjectId } from "mongodb";
import { postItem } from "../../models";
import { History } from "../../schema/historyEntry.schema";
import { ItemZSchema } from "../../schema/item.schema";

export async function postItemController(req, res, next) {
    const data = req.body;

    const parsed = ItemZSchema.safeParse(data);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Error parsing posted item",
            error: parsed.error.issues
        });
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdItem = { ...parsed.data };

    return postItem(createdItem)
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            
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
            if (!history) return;

            return res.status(201).json({
                msg: "Item created successfully!",
                item: createdItem,
                history
            });
        })
        .catch((err) => { next(err) });
};