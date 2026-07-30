import { connectDB } from '../../db/connection.js';

import { z } from "zod";
import { InventoryZSchema } from '../schema/inventory.schema.js';

import {
    getInventories, 
    getInventory, 
    postInventory, 
    patchInventory, 
    clearInventory, 
    deleteInventory
} from "../models/index.js";

export async function getInventoriesController(req, res, next) {
  const Queries = ["topic", "author", "sort", "order", "p", "limit", "only"]; // valid queries

  for (const key in req.query) {
    if (!Queries.includes(key)) {
      // if not a valid query paramater
      return Promise.reject({ status: 400, err_msg: "Invalid Query" });
    }
  }
  const { topic, author, sort, order, p, limit, only } = req.query;

  return getInventories()
    .then((inventories) => {
      if (!inventories) return res.status(404).send({ err_msg: "404: Not Found" });
      else return res.status(200).send({ inventories });
    })
    .catch((err) => { next(err) });
};


export async function getInventoryController(req, res, next) {
    return getInventory()
        .then((inventory) => {
            if (inventory) return res.status(400).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ inventory });
        })
        .catch((err) => { next(err) })
};


export async function postInventoryController(req, res, next) {
    const { inventoryId } = req.params;
    const data = req.body;

    const parsed = InventoryZSchema.parse(data);

    return postInventory(inventoryId);
};

export async function patchInventoryController(req, res, next) {
    const { inventoryId } = req.params;
    const data = req.body;

    const parsed = InventoryZSchema.parse(data);

    return patchInventory(inventoryId);
};


export async function deleteInventoryController(req, res, next) {
    const { inventoryId } = req.params;

    return deleteInventory(inventoryId);
};