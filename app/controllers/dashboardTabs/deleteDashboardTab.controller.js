import { deleteDashboardTab } from "../../models/dashboardTabs.model";
import { User } from "../../schema/user.schema";
import { History } from "../../schema/historyEntry.schema";
import { ObjectIdSchema } from "../../schema/z";

export async function deleteDashboardTabController(req, res, next) {
    const { id } = req.params;

    const parsedId = ObjectIdSchema.safeParse(id);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid dashboardTab ID",
            issues: parsedId.error.issues
        });
    };

    let dashboardTab;

    return deleteDashboardTab(parsedId.data)
        .then((response) => {
            if (!response) return res.status(404).send({ msg: "404: Not Found "})
            
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
            return res.status(200).json({
                msg: "Dashboard tab deleted successfully!",
                dashboardTabId: parsedId.data,
                dashboardTab
            });
        })
        .catch((err) => { next(err) })
};