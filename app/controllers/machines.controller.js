import { connectDB } from '../../db/connection.js';

import { z } from "zod";
import { MachineZSchema } from '../schema/machine.schema.js';

import {
    getMachines, 
    getMachine, 
    postMachine, 
    patchMachine, 
    clearMachine, 
    deleteMachine
} from "../models/index.js";

export async function getMachinesController(req, res, next) {
  const Queries = ["topic", "author", "sort", "order", "p", "limit", "only"]; // valid queries

  for (const key in req.query) {
    if (!Queries.includes(key)) {
      // if not a valid query paramater
      return Promise.reject({ status: 400, err_msg: "Invalid Query" });
    }
  }
  const { topic, author, sort, order, p, limit, only } = req.query;

  return getMachines()
    .then((data) => {
      if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
      else return res.status(200).send({ data });
    })
    .catch((err) => { next(err) });
};


export async function getMachineController(req, res, next) {
    const { machineId } = req.params;

    return getMachine()
        .then((data) => {
            if (data) return res.status(400).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ data });
        })
        .catch((err) => { next(err) })
};


export async function postMachineController(req, res, next) {
    const { machineId } = req.params;
    const data = req.body;

    const parsed = MachineZSchema.parse(data);

    return postInventory(inventoryId);
};

export async function patchMachineController(req, res, next) {
    const { machineId } = req.params;
    const data = req.body;

    const parsed = MachineZSchema.parse(data);

    return patchMachine(inventoryId);
};


export async function deleteMachineController(req, res, next) {
    const { machineId } = req.params;

    return deleteMachine(machineId);
};