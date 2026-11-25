import {
    getWorkflowsService,
    getWorkflowService,
    postWorkflowService,
    patchWorkflowService,
    deleteWorkflowService
} from "../service/index.js";

import { AppError } from "../schema/AppError.js";

export async function getWorkflowsController(req, res, next) {
    const query = req.query;

    // returns total, totalPages, workflows
    return getWorkflowsService(query)
        .then((response) => {
            if (!response || !response.workflows) return res.status(404);

            const { total, totalPages, workflows } = response;

            return res.status(200).json({
                total, totalPages,
                workflows
            });
        })
        .catch((err) => { 
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };

            next(err);
        });
};

export async function getWorkflowController(req, res, next) {
    const { workflowId } = req.params;

    // returns workflow
    return getWorkflowService(workflowId)
        .then((workflow) => {
            if (!workflow) return res.status(404);

            return res.status(200).json({ workflow });
        })
        .catch((err) => { 
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };

            next(err);
        });
};

export async function postWorkflowController(req, res, next) {
    const workflow = req.body;

    // returns workflow
    return postWorkflowService(workflow)
        .then((workflow) => {
            if (!workflow) return res.status(404);

            return res.status(201).json({
                msg: "Workflow posted successfully!",
                workflow
            });
        })
        .catch((err) => { 
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };

            next(err);
        });
};

export async function patchWorkflowController(req, res, next) {
    const { workflowId } = req.params;
    const patch = req.body;

    // returns workflow
    return patchWorkflowService(workflowId, patch)
        .then((workflow) => {
            if (!workflow) return res.status(404);

            return res.status(200).json({
                msg: "Workflow patched successfully!",
                workflow
            });
        })
        .catch((err) => { 
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };

            next(err);
        });
};

export async function deleteWorkflowController(req, res, next) {
    const { workflowId } = req.params

    // returns workflow
    return deleteWorkflowService(workflowId)
        .then((workflow) => {
            if (!workflow) return res.status(404);

            return res.status(200).json({
                msg: "Workflow deleted successfully!",
                workflow
            });
        })
        .catch((err) => { 
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };

            next(err);
        });
};