import express from "express";

export const usersRouter = express.Router();

import { getUserController, postUserController, patchUserController, deleteUserController } from "../controllers/users.controller";

// /articles
usersRouter.route("/")
  .get(() => {})
  .post(postUserController)
  .patch((req, res) => { res.status(200).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(200).send("This endpoint does nothing!") })

// inventoriesRouter.route("/data/:dataType")
//   .get(getArticlesData)

// /users/:userId
usersRouter.route("/:userId")
  .get(getUserController)
  .post(() => { res.status(200).send("This endpoint does nothing! POST to the /inventories endpoint or use PATCH instead") })
  .patch(patchUserController)
  .delete(deleteUserController);

// inventoriesRouter.route("/:inventoryId/:dataType")
//   .get(getArticleData)
//   .post((req, res) => { res.status(200).send( { msg, patch_msg }) })
//   .patch(patchArticleData)
//   .delete((req, res) => { res.status(200).send( { msg, patch_msg }) })