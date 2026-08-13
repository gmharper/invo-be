import { postDashboardTab } from "../../models/dashboardTabs.model.js";
import { History } from "../../schema/historyEntry.schema";
import { DashboardTabZSchema } from "../../schema/dashboardTab.schema";
import { ObjectId } from "mongodb";

export async function postDashboardTabController(req, res, next) {
    const data = req.body;

    const parsed = DashboardTabZSchema.safeParse(data);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Error parsing posted dashboardTab",
            error: parsed.error.issues
        });
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdDashboardTab = { ...parsed.data }

    return postDashboardTab(parsed.data)
        .then((response) => {
            if (!response) return res.status(404).send({ err_msg: "404: Not Found" });
            
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
            if (!history) return;

            return res.status(201).json({
                msg: "Dashboard tab created successfully!",
                dashboardTab: createdDashboardTab,
                history
            });
        })
        .catch((err) => { next(err) });
};