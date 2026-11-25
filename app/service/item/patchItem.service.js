// MODELS
import { patchItem } from "../../models/item.model.js";

// SCHEMA
import { ItemZSchema } from "../../schema/item.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function patchItemService(itemId, patch) {
    const parsedId = ObjectIdSchema.safeParse(itemId);

    if (!parsedId.success) {
        throw new AppError("Invalid item ID.", 400, parsedId.error.format());
    };

    const parsed = ItemZSchema.parse(patch);

    const blacklist = [
        "_id", "permissions",
        "linkedFrom", "clonedFrom",
        "comments", "history", "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchItem(parsedId.data, parsed)
        .then((item) => {
            if (!item) throw new AppError("404: Not found", 404, null);
            
            return item;
        });
};