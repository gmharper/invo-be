// MODELS
import { postDashboardTab } from "../../models/dashboardTab.model.js";

// SCHEMA
import { History } from "../../schema/historyEntry.schema.js";
import { DashboardTabZSchema } from "../../schema/dashboardTab.schema.js";
import { AppError } from "../../schema/AppError.js";
import { ObjectId } from "mongodb";

export async function postDashboardTabService(dashboardTab) {
    const parsed = DashboardTabZSchema.safeParse(dashboardTab);

    if (!parsed.success) {
        throw new AppError("Error parsing posted dashboardTab.", 400, parsed.error.format());
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdDashboardTab = { ...parsed.data }

    return postDashboardTab(parsed.data)
        .then((response) => {
            if (!response) return;
            
            return History.create({
                _id: historyId,
                refId: createdDashboardTab._id,
                type: "dashboardTab",
                entries: [
                    { author:createdDashboardTab.author, action:"DASHBOARD_TAB_CREATED", body:"", timestamp:createdDashboardTab.createdAt }
                ],
                createdAt: createdDashboardTab.createdAt,
                updatedAt: createdDashboardTab.updatedAt
            });
        })
        .then((history) => {
            return createdDashboardTab;
        });
};