import { deleteItem } from "../../models";
import { Comment } from "../../schema/commentEntry.schema";
import { History } from "../../schema/historyEntry.schema";
import { User } from "../../schema/user.schema";
import { ObjectIdSchema } from "../../schema/z";

export async function deleteItemController(req, res, next) {
    const { itemId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(itemId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid item ID",
            issues: parsedId.error.issues
        });
    };

    const id = parsedId.data;
    let item;

    return deleteItem(id)
        .then((response) => {
            if (!response) return res.status(404).send({ msg: "404: Not Found "})
            
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
            return res.status(200).json({
                msg: "Item deleted successfully!",
                itemId: id,
                item
            });
        })
        .catch((err) => { next(err) })
};