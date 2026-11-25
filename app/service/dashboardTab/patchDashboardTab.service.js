// MODELS
import { patchDashboardTab } from "../../models/dashboardTab.model.js";

// SCHEMA
import { DashboardTabZSchema } from "../../schema/dashboardTab.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function patchDashboardTabService(id, patch) {
    const parsedId = ObjectIdSchema.safeParse(id);

    if (!parsedId.success) {
        throw new AppError("Invalid dashboard tab ID.", 400, parsedId.error.format());
    };

    const parsed = DashboardTabZSchema.parse(patch);

    const blacklist = [
        "_id", 
        "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchDashboardTab(parsedId.data, parsed)
        .then((dashboardTab) => {
            if (!dashboardTab) throw new AppError("404: Not found", 404, null);
            
            return dashboardTab;
        });
};