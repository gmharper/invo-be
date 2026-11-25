// MODELS
import { getHistoryService, appendHistoryService, trimHistoryService } from "../service/index.js";

// SCHEMA
import { ObjectIdSchema } from "../schema/z.js";

import { AppError } from "../schema/AppError.js";

export async function getHistoryByRef(req, res, next) {
    const { refId } = req.params;

    req.params.historyId = refId;

    getHistoryController(req, res, next, true);
};


export async function getHistoryController(req, res, next, useRef=false) {
    const { historyId } = req.params;

    return getHistoryService(historyId, useRef)
        .then((history) => {
            if (!history) return res.status(404).send({ err_msg: "404: Not Found" });

            else return res.status(200).send({ history });
        })
        .catch((err) => { 
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };

            next(err);
        })
};


export async function patchHistoryController(req, res, next) {
    const { historyId } = req.params;

    const patch = req.body;

    if (!isNaN(patch)) { return trimHistoryService(historyId, patch)
        .then((history) => {
            if (!history) return res.status(404).send({ err_msg: "404: Not Found" });

            else return res.status(200).send({
                msg: "History successfully trimmed",
                count: data,
                history
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
        })
    }

    else { return appendHistoryService(historyId, patch)
        .then((history) => {
            if (!history) return res.status(404).send({ err_msg: "404: Not Found" });

            else return res.status(200).send({ 
                msg: "History successfully appended!",
                history
            });
        })
        .catch((err) => {
            if (err instanceof AppError) {
                return res.status(err.status).json({
                    reason: err.reason,
                    details: err.details
                });
            };

            next(err)
        })
    }
};


export async function appendHistoryController(historyId, patch) {
    return appendHistoryService(historyId, patch)
        .then((history) => {
            if (!history) return res.status(404).send({ err_msg: "404: Not Found" });

            else return res.status(200).send({ 
                msg: "History successfully appended!",
                history
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


export async function trimHistoryController(historyId, patch) {
    return trimHistoryService(historyId, patch)
        .then((history) => {
            if (!history) return res.status(404).send({ err_msg: "404: Not Found" });

            else return res.status(200).send({
                msg: "History successfully trimmed",
                count: data,
                history
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