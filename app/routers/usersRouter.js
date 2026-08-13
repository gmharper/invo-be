import express from "express";

export const usersRouter = express.Router();

import { 
  getUsersController, 
  getUserController, 
  postUserController, 
  patchUserController, 
  deleteUserController 
} from "../controllers/users/index.js";

import {
  getUserPreferencesByRef,
  getUserPreferencesController,
  patchUserPreferencesByRef,
  patchUserPreferencesController
} from "../controllers/userPreferences.controller.js";

import { getCommentsController } from "../controllers/comments.controller.js";
import { getHistoryByRef } from "../controllers/history.controller.js";

usersRouter.route("/")
  .get(getUsersController)
  .post(postUserController)
  .patch((req, res) => { res.status(405).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(405).send("This endpoint does nothing!") })

usersRouter.route("/:userId")
  .get(getUserController)
  .post((req, res) => { res.status(405).send("This endpoint does nothing! POST to the /users endpoint or use PATCH instead") })
  .patch(patchUserController)
  .delete(deleteUserController);

// preferences, comments & history
usersRouter.get("/:userId/preferences", (req, res, next) => {
  req.params.refId = req.params.userId;
}, getUserPreferencesByRef);

// usersRouter.get("/:userId/comments", (req, res, next) => {
//   req.query.refId = req.params.userId;
//   next();
// }, getCommentsController);

usersRouter.get("/:userId/history", (req, res, next) => {
  req.params.refId = req.params.userId;
  next();
}, getHistoryByRef);
