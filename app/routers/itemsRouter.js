import express from "express";

export const itemsRouter = express.Router();

import { 
  getItemsController, 
  getItemController, 
  postItemController, 
  patchItemController, 
  deleteItemController 
} from "../controllers/items/index.js";

import { getCommentsController } from "../controllers/comments.controller.js";
import { getHistoryByRef } from "../controllers/history.controller.js";

// /items
itemsRouter.route("/")
  .get(getItemsController)
  .post(postItemController)
  .patch((req, res) => { res.status(405).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(405).send("This endpoint does nothing!") })

// /items/:itemId
itemsRouter.route("/:itemId")
  .get(getItemController)
  .post((req, res) => { res.status(405).send("This endpoint does nothing! POST to the /items endpoint or use PATCH instead") })
  .patch(patchItemController)
  .delete(deleteItemController);