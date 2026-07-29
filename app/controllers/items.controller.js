import { connectDB } from '../../db/connection';
import { z } from "zod";

import {
    getItems, getItem, postItem, patchItem, clearItem, deleteItem
} from "../models";

export async function getItemsController(req, res, next) {
  const Queries = ["topic", "author", "sort", "order", "p", "limit", "only"]; // valid queries

  for (const key in req.query) {
    if (!Queries.includes(key)) {
      // if not a valid query paramater
      return Promise.reject({ status: 400, err_msg: "Invalid Query" });
    }
  }
  const { author, sort, order, p, limit, only } = req.query;

  return getItems()
    .then((items) => {
      if (!items) return res.status(404).send({ err_msg: "404: Not Found" });
      else return res.status(200).send({ items });
    })
    .catch((err) => { next(err) });
};


export async function getItemController(req, res, next) {
    return getItem()
        .then((item) => {
            if (item) return res.status(400).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ item });
        })
        .catch((err) => { next(err) })
};


export async function postItemController(req, res, next) {
    return postItem()
};

export async function patchItemController(req, res, next) {
    return patchItem()
};


export async function deleteItemController(req, res, next) {
    return deleteItem()
};