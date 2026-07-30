import { connectDB } from '../../db/connection.js';
import { z } from "zod";

import {
    getUsers, 
    getUser, 
    postUser, 
    patchUser, 
    clearUser, 
    deleteUser
} from "../models/index.js";
import { User, UserZSchema } from '../schema/user.schema.js';

const validSorts = ["id", "name"]
const validOrders = ["ascending", "descending", "asc", "desc", "1", "-1"];

export async function getUsersController(req, res, next) {
    const Queries = ["limit", "p", "sort", "order", "only"]; // valid queries

    for (const key in req.query) {
        if (!Queries.includes(key)) {
        // if not a valid query paramater
        return Promise.reject({ status: 400, err_msg: "Invalid Query" });
        }
    }
    const { sort, order, p, limit, only } = req.query;

    if (p < 0) return res.status(400).send({ err_msg: "" });

    return getUsers(sort, order, Math.min(60, limit), Math.max(0, p))
        .then((data) => {
        if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
        else return res.status(200).send({ data })
        })
        .catch((err) => { next(err) });
};


export async function getUserController(req, res, next) {
    const { userId } = req.params;

    return getUser()
        .then((user) => {
            if (user) return res.status(400).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ user });
        })
        .catch((err) => { next(err) })
};


export async function postUserController(req, res, next) {
    const { userId } = req.params;
    const data = req.body;

    const parsed = UserZSchema.parse(data);

    return postUser(userId);
};

export async function patchUserController(req, res, next) {
    const { userId } = req.params;
    const data = req.body;

    const parsed = UserZSchema.parse(data);

    return patchUser(userId);
};


export async function deleteUserController(req, res, next) {
    const { userId } = req.params;

    return deleteUser(userId);
};