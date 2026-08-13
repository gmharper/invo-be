import express from "express";

import { 
    getHistoryController, 
    patchHistoryController
} from "../controllers/history.controller.js";

export const historiesRouter = express.Router();

historiesRouter.route("/:historyId")
    .get(getHistoryController)
    .post((req, res) => res.status(400).send("This endpoint does nothing! Use patch instead."))
    .patch(patchHistoryController)
    .delete((req, res) => res.status(400).send("This endpoint does nothing!"))