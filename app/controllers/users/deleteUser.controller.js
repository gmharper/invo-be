// MODELS
import { deleteUser } from "../../models";

// SCHEMA
import { Inventory } from "../../schema/inventory.schema.js";
import { Item } from "../../schema/item.schema.js";
import { Machine } from "../../schema/machine.schema.js";
import { Workflow } from "../../schema/workflow.schema.js";
import { UserPreferences } from "../../schema/userPreferences.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export default async function deleteUserController(req, res, next) {
    const { userId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(userId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid user ID",
            issues: parsedId.error.issues
        });
    };

    const id = parsedId.data;
    let user;

    return deleteUser(id)
        .then((response) => {
            if (!response) return res.status(404).send({ err_msg: "404: Not Found" });

            user = response;

            return Promise.all([
                Inventory.deleteMany({ author:id }),
                Item.deleteMany({ author:id }),
                Machine.deleteMany({ author:id }),
                Workflow.deleteMany({ author:id })
            ]);
        })
        .then(() => {
            return UserPreferences.deleteOne({ _id: user.preferences });
        })
        .then(() => {
            return History.deleteOne({ _id: user.history });
        })
        .then(() => {
            return res.status(200).json({ 
                msg: "User deleted successfully!",
                userId: id,
                user
            });
        })
        .catch((err) => { next(err) })
};