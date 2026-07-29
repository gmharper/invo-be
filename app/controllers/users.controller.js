import { connectDB } from '../../db/connection';
import { z } from "zod";

import {
    getUsers, getUser, postUser, patchUser, clearUser, deleteUser
} from "../models";

export async function getUsersController(req, res, next) {
  const Queries = ["sort", "order", "p", "limit", "only"]; // valid queries

  for (const key in req.query) {
    if (!Queries.includes(key)) {
      // if not a valid query paramater
      return Promise.reject({ status: 400, err_msg: "Invalid Query" });
    }
  }
  const { sort, order, p, limit, only } = req.query;

  return getUsers()
    .then((users) => {
      if (!users) return res.status(404).send({ err_msg: "404: Not Found" });
      else return res.status(200).send({ users })
    })
    .catch((err) => { next(err) });
};


export async function getUserController(req, res, next) {
    return getUser()
        .then((user) => {
            if (user) return res.status(400).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ user });
        })
        .catch((err) => { next(err) })
};


export async function postUserController(req, res, next) {
    return postUser()
};

export async function patchUserController(req, res, next) {
    return patchUser()
};


export async function deleteUserController(req, res, next) {
    return deleteUser()
};