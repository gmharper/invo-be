// MODELS
import { deleteUser } from "../../models/user.model.js";

// SCHEMA
import { Inventory } from "../../schema/inventory.schema.js";
import { Item } from "../../schema/item.schema.js";
import { Machine } from "../../schema/machine.schema.js";
import { Workflow } from "../../schema/workflow.schema.js";
import { UserPreferences } from "../../schema/userPreferences.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function deleteUserService(userId) {
    const parsedId = ObjectIdSchema.safeParse(userId);

    if (!parsedId.success) {
        throw new AppError("Invalid user ID.", 400, parsedId.error.format());
    };

    const id = parsedId.data;
    let user;

    return deleteUser(id)
        .then((response) => {
            if (!response) return;

            user = response;

            return Promise.all([
                Inventory.deleteMany({ author:id }),
                Item.deleteMany({ author:id }),
                Machine.deleteMany({ author:id }),
                Workflow.deleteMany({ author:id }),
                UserPreferences.deleteOne({ _id: user.preferences }),
                History.deleteOne({ _id: user.history })
            ]);
        })
        .then(() => {
            return user;
        })
};