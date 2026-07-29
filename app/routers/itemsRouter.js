import express from "express";

export const itemsRouter = express.Router();

import { getItemController, postItemController, patchItemController, deleteItemController } from "../controllers/items.controller";

// /articles
itemsRouter.route("/")
  .get(() => {})
  .post(postItemController)
  .patch((req, res) => { res.status(200).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(200).send("This endpoint does nothing!") })

// itemsRouter.route("/data/:dataType")
//   .get(getArticlesData)

// /items/:itemId
itemsRouter.route("/:itemId")
  .get(getItemController)
  .post(() => { res.status(200).send("This endpoint does nothing! POST to the /inventories endpoint or use PATCH instead") })
  .patch(patchItemController)
  .delete(deleteItemController);

// itemsRouter.route("/:itemId/:dataType")
//   .get(getArticleData)
//   .post((req, res) => { res.status(200).send( { msg, patch_msg }) })
//   .patch(patchArticleData)
//   .delete((req, res) => { res.status(200).send( { msg, patch_msg }) })