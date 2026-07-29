import express from "express";
const apiRouter = express.Router();

import getApi from "../controllers/api.controller";

import usersRouter from "./usersRouter";
import inventoriesRouter from "./inventoriesRouter";
import itemsRouter from "./itemsRouter";
// machines
// workflows
// itemsData

apiRouter.get("/", getApi);
apiRouter.use("/users", usersRouter);
apiRouter.use("/inventories", inventoriesRouter);
apiRouter.use("/items", itemsRouter);


module.exports = apiRouter;
