import express from "express";

export const syncRouter = express.Router();

import { postSyncController } from "../controllers/sync.controller.js"

syncRouter.route("/")
    .post(postSyncController)