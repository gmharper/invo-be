import express from "express";

export const dashboardTabsRouter = express.Router();

import {
    getDashboardTabsController,
    getDashboardTabController,
    postDashboardTabController,
    patchDashboardTabController,
    deleteDashboardTabController
} from "../controllers/dashboardTabs/index.js";

dashboardTabsRouter.route("/")
    .get(getDashboardTabsController)
    .post(postDashboardTabController)
    .patch((req, res) => res.status(405).send("This endpoint does nothing!"))
    .delete((req, res) => res.status(405).send("This endpoint does nothing!"))

dashboardTabsRouter.route("/:id")
    .get(getDashboardTabController)
    .post((req, res) => res.status(405).send("This endpoint does nothing! POST to the /dashboardTabs endpoint or use PATCH instead"))
    .patch(patchDashboardTabController)
    .delete(deleteDashboardTabController);