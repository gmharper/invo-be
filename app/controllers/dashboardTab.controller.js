import { 
    getDashboardTabsService, 
    getDashboardTabService, 
    postDashboardTabService, 
    patchDashboardTabService, 
    deleteDashboardTabService 
} from "../service/index.js";

import { AppError } from "../schema/AppError.js";

export async function getDashboardTabsController(req, res, next) {
    const query = req.query;

    return getDashboardTabsService(query)
        .then((dashboardTab) => {
            if (!dashboardTab) return res.status(404);

            return res.status(200).json({ dashboardTab });
        })
        .catch((err) => {
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };     

            next(err);
        });
};

export async function getDashboardTabController(req, res, next) {
    const { id } = req.params;

    return getDashboardTabService(id)
        .then((dashboardTab) => {
            if (!dashboardTab) return res.status(404);
            
            return res.status(200).json({ dashboardTab });
        })
        .catch((err) => {
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };     

            next(err);    
        });
};

export async function postDashboardTabController(req, res, next) {
    const dashboardTab = req.body;

    return postDashboardTabService(dashboardTab)
        .then((dashboardTab) => {
            if (!dashboardTab) return res.status(400);

            return res.status(201).json({ 
                msg: "Dashboard tab posted successfully!",
                dashboardTab 
            });
        })
        .catch((err) => {
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };     

            next(err);
        });
};

export async function patchDashboardTabController(req, res, next) {
    const { id } = req.params;
    const patch = req.body;

    return patchDashboardTabService(id, patch)
        .then((dashboardTab) => {
            if (!dashboardTab) return res.status(400);

            return res.status(200).json({
                msg: "Dashboard tab patched successfully!",
                dashboardTab
            });
        })
        .catch((err) => {
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };     

            next(err);
        });
};

export async function deleteDashboardTabController(req, res, next) {
    const { id } = req.params

    return deleteDashboardTabService(id)
        .then((dashboardTab) => {
            if (!dashboardTab) return res.status(404);

            return res.status(200).json({
                msg: "Dashboard tab deleted successfully!",
                dashboardTab
            });
        })
        .catch((err) => {
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };     

            next(err);
        });
};