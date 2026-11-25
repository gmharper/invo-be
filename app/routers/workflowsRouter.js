import express from "express";

export const workflowsRouter = express.Router();

import {
  getWorkflowsController,
  getWorkflowController,
  postWorkflowController,
  patchWorkflowController,
  deleteWorkflowController
} from "../controllers/workflow.controller.js";

workflowsRouter.route("/")
  .get(getWorkflowsController)
  .post(postWorkflowController)
  .patch((req, res) => { res.status(405).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(405).send("This endpoint does nothing!") })

workflowsRouter.route("/:workflowId")
  .get(getWorkflowController)
  .post((req, res) => { res.status(405).send("This endpoint does nothing! POST to the /workflows endpoint or use PATCH instead") })
  .patch(patchWorkflowController)
  .delete(deleteWorkflowController);