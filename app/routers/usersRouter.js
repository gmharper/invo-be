import express from "express";

export const usersRouter = express.Router();

import { 
  getUsersController, 
  getUserController, 
  postUserController, 
  patchUserController, 
  deleteUserController 
} from "../controllers/users.controller.js";

usersRouter.route("/")
  .get(getUsersController)
  .post(postUserController)
  .patch((req, res) => { res.status(200).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(200).send("This endpoint does nothing!") })

usersRouter.route("/:userId")
  .get(getUserController)
  .post(() => { res.status(200).send("This endpoint does nothing! POST to the /users endpoint or use PATCH instead") })
  .patch(patchUserController)
  .delete(deleteUserController);