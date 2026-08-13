// MODELS
import { patchDashboardTab } from "../../models/dashboardTabs.model.js";

// SCHEMA
import { DashboardTabZSchema } from "../../schema/dashboardTab.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function patchDashboardTabController(req, res, next) {
    const { id } = req.params;
    const data = req.body;

    const parsedId = ObjectIdSchema.safeParse(id)
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid dashboardTab ID",
            issues: parsedId.error.issues
        });
    };

    const parsed = DashboardTabZSchema.parse(data);

    const blacklist = [
        "_id", 
        "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchDashboardTab(parsedId.data, parsed)
        .then((dashboardTab) => {
            if (!dashboardTab) return res.status(404).send({ err_msg: "404: Not Found" })
            else return res.status(200).send({ 
                msg: "Dashboard tab patched successfully!",
                dashboardTab 
            });
        })
        .catch((err) => { next(err) })
};