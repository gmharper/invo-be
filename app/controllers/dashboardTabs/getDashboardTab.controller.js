import { getDashboardTabs, getDashboardTab } from "../../models/dashboardTabs.model";
import { queryValidationSchema } from "../../schema/queryValidation.schema";
import { ObjectIdSchema } from "../../schema/z";

export async function getDashboardTabsController(req, res, next) {
    const parsed = queryValidationSchema.safeParse(req.query);

    if (!parsed.success) {
        return res.status(400).json(parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'panels', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        return res.status(400).json({
            error: "Invalid sort query"
        });
    };

    return getDashboardTabs({ ...parsed.data })
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ ...data });
        })
        .catch((err) => { next(err) });
};

export async function getDashboardTabController(req, res, next) {
    const { id } = req.params;

    const parsedId = ObjectIdSchema.safeParse(id);

    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid dashboardTab ID",
            issues: parsedId.error.issues
        });
    };
    
    return getDashboardTab(parsedId.data)
        .then((dashboardTab) => {
            if (!dashboardTab) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ dashboardTab });
        })
        .catch((err) => { next(err) })
};