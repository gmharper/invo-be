import express from "express";

export const inventoriesRouter = express.Router();

import { getInventoryController, postInventoryController, patchInventoryController, deleteInventoryController } from "../controllers/inventories.controller";

// /articles
inventoriesRouter.route("/")
  .get(() => {})
  .post(postInventoryController)
  .patch((req, res) => { res.status(200).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(200).send("This endpoint does nothing!") })

// inventoriesRouter.route("/data/:dataType")
//   .get(getArticlesData)

// /inventories/:inventoryId
inventoriesRouter.route("/:inventoryId")
  .get(getInventoryController)
  .post(() => { res.status(200).send("This endpoint does nothing! POST to the /inventories endpoint or use PATCH instead") })
  .patch(patchInventoryController)
  .delete(deleteInventoryController);

// inventoriesRouter.route("/:inventoryId/:dataType")
//   .get(getArticleData)
//   .post((req, res) => { res.status(200).send( { msg, patch_msg }) })
//   .patch(patchArticleData)
//   .delete((req, res) => { res.status(200).send( { msg, patch_msg }) })