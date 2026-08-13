// MODELS
import { patchItem } from "../../models";

// SCHEMA
import { ItemZSchema } from "../../schema/item.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function patchItemController(req, res, next) {
    const { itemId } = req.params;
    const data = req.body;

    const parsedId = ObjectIdSchema.safeParse(itemId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid item ID",
            issues: parsedId.error.issues
        });
    };

    const parsed = ItemZSchema.parse(data);

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
            if (!item) return res.status(404).send({ err_msg: "404: Not Found" })
            
            return res.status(200).json({ 
                msg: "Item patched successfully!",
                item 
            });
        })
        .catch((err) => { next(err) })
};