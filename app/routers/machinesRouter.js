import express from "express";

export const machinesRouter = express.Router();

import { 
    getMachinesController, 
    getMachineController, 
    postMachineController, 
    patchMachineController, 
    deleteMachineController 
} from "../controllers/machines.controller.js";

machinesRouter.route("/")
  .get(getMachinesController)
  .post(postMachineController)
  .patch((req, res) => { res.status(200).send("This endpoint does nothing!") })
  .delete((req, res) => { res.status(200).send("This endpoint does nothing!") })

machinesRouter.route("/:machineId")
  .get(getMachineController)
  .post(() => { res.status(200).send("This endpoint does nothing! POST to the /machines endpoint or use PATCH instead") })
  .patch(patchMachineController)
  .delete(deleteMachineController);