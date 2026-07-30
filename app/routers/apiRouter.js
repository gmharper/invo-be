import express from "express";
const apiRouter = express.Router();

import getApi from "../controllers/api.controller.js";

import { usersRouter } from "./usersRouter.js";
import { inventoriesRouter } from "./inventoriesRouter.js";
import { itemsRouter } from "./itemsRouter.js";
import { machinesRouter } from "./machinesRouter.js";
import { workflowsRouter } from "./workflowsRouter.js";

apiRouter.get("/", getApi);
apiRouter.use("/users", usersRouter);
apiRouter.use("/inventories", inventoriesRouter);
apiRouter.use("/items", itemsRouter);
apiRouter.use("/machines", machinesRouter);
apiRouter.use("/workflows", workflowsRouter);

export default apiRouter;
