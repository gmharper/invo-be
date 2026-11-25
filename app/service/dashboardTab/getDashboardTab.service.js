// MODELS
import { getDashboardTabs, getDashboardTab } from "../../models/dashboardTab.model.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getDashboardTabsService(query) {
    const parsed = queryValidationSchema.safeParse(query);

    if (!parsed.success) {
        throw new AppError("Invalid query.", 400, parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'panels', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        throw new AppError("Invalid sort query.", 400, null);
    };

    return getDashboardTabs({ ...parsed.data })
        .then((data) => {
            if (!data || !data.dashboardTabs) throw new AppError("404: Not found", 404, null);
            
            return data;
        });
};

export async function getDashboardTabService(id) {
    const parsedId = ObjectIdSchema.safeParse(id);

    if (!parsedId.success) {
        throw new AppError("Invalid dashboard tab ID.", 400, parsedId.error.format());
    };
    
    return getDashboardTab(parsedId.data)
        .then((dashboardTab) => {
            if (!dashboardTab) throw new AppError("404: Not found", 404, null);

            return dashboardTab;
        });
};