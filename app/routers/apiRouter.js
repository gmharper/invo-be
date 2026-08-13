import express from "express";
const apiRouter = express.Router();

import getApi from "../controllers/api.controller.js";

import { usersRouter } from "./usersRouter.js";
import { inventoriesRouter } from "./inventoriesRouter.js";
import { itemsRouter } from "./itemsRouter.js";
import { machinesRouter } from "./machinesRouter.js";
import { workflowsRouter } from "./workflowsRouter.js";

import { historiesRouter } from "./historiesRouter.js";
import { commentsRouter } from "./commentsRouter.js";
import { preferencesRouter } from "./preferencesRouter.js";
import { dashboardTabsRouter } from "./dashboardTabsRouter.js";

apiRouter.use("/users", usersRouter);
apiRouter.use("/inventories", inventoriesRouter);
apiRouter.use("/items", itemsRouter);
apiRouter.use("/machines", machinesRouter);
apiRouter.use("/workflows", workflowsRouter);

apiRouter.use("/history", historiesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/preferences", preferencesRouter);
apiRouter.use("/dashboardTabs", dashboardTabsRouter);
apiRouter.get("/", getApi);

export default apiRouter;
