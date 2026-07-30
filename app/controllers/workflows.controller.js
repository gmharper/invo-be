import { connectDB } from '../../db/connection.js';

import { z } from "zod";
import { WorkflowZSchema } from '../schema/workflow.schema.js';

import {
    getWorkflows, 
    getWorkflow, 
    postWorkflow, 
    patchWorkflow, 
    clearWorkflow, 
    deleteWorkflow
} from "../models/index.js";

export async function getWorkflowsController(req, res, next) {
  const Queries = ["topic", "author", "sort", "order", "p", "limit", "only"]; // valid queries

  for (const key in req.query) {
    if (!Queries.includes(key)) {
      // if not a valid query paramater
      return Promise.reject({ status: 400, err_msg: "Invalid Query" });
    }
  }
  const { topic, author, sort, order, p, limit, only } = req.query;

  return getWorkflows()
    .then((data) => {
      if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
      else return res.status(200).send({ data });
    })
    .catch((err) => { next(err) });
};


export async function getWorkflowController(req, res, next) {
    const { workflowId } = req.params;

    return getWorkflow(workflowId)
        .then((data) => {
            if (data) return res.status(400).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ data });
        })
        .catch((err) => { next(err) })
};


export async function postWorkflowController(req, res, next) {
    const { workflowId } = req.params;
    const data = req.body;

    const parsed = WorkflowZSchema.parse(data);

    return postWorkflow(workflowId);
};

export async function patchWorkflowController(req, res, next) {
    const { workflowId } = req.params;
    const data = req.body;

    const parsed = WorkflowZSchema.parse(data);

    return patchWorkflow(workflowId);
};


export async function deleteWorkflowController(req, res, next) {
    const { workflowId } = req.params;

    return deleteWorkflow(workflowId);
};