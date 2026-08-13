import express from "express";

export const inventoriesRouter = express.Router();

import { 
  getInventoriesController, 
  getInventoryController, 
  postInventoryController, 
  patchInventoryController, 
  deleteInventoryController 
} from "../controllers/inventories/index.js";

import { getCommentsController } from "../controllers/comments.controller.js";
import { getHistoryByRef } from "../controllers/history.controller.js";

inventoriesRouter.route("/")
  .get(getInventoriesController)
  .post(postInventoryController)
  .patch((req, res) => { res.status(405).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(405).send("This endpoint does nothing!") })

inventoriesRouter.route("/:inventoryId")
  .get(getInventoryController)
  .post((req, res) => { res.status(405).send("This endpoint does nothing! POST to the /inventories endpoint or use PATCH instead") })
  .patch(patchInventoryController)
  .delete(deleteInventoryController);






