// MODELS
import { deleteDashboardTab } from "../../models/dashboardTab.model.js";

// SCHEMA
import { User } from "../../schema/user.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function deleteDashboardTabService(id) {
    const parsedId = ObjectIdSchema.safeParse(id);
    if (!parsedId.success) {
        throw new AppError("Invalid dashboard tab ID.", 400, parsedId.error.format());
    };

    let dashboardTab;

    return deleteDashboardTab(parsedId.data)
        .then((response) => {
            if (!response) return;
            
            dashboardTab = response;

            return User.updateOne(
                { _id: dashboardTab.author },
                { $pull: { dashboardTabs: dashboardTab._id }},
            );
        })
        .then(() => {
            return History.deleteOne({ _id: dashboardTab.history });
        })
        .then(() => {
            return dashboardTab;
        });
};