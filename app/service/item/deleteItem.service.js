import { deleteItem } from "../../models/item.model.js";

// SCHEMA
import { User } from "../../schema/user.schema.js";
import { Comment } from "../../schema/commentEntry.schema.js"
import { History } from "../../schema/historyEntry.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function deleteItemService(itemId) {
    const parsedId = ObjectIdSchema.safeParse(itemId);

    if (!parsedId.success) {
        throw new AppError("Invalid item ID.", 400, parsedId.error.format());
    };

    const id = parsedId.data;
    let item;

    return deleteItem(id)
        .then((response) => {
            if (!response) return;
            
            item = response;

            return User.updateOne(
                { _id: item.author },
                { $pull: { items: item._id }},
                { $pull: { "favourites.items": item._id }}
            );
        })
        .then(() => {
            return Comment.deleteMany({ _id: { $in:item.comments }})
        })
        .then(() => {
            return History.deleteOne({ _id: item.history });
        })
        .then(() => {
            return item;
        });
};