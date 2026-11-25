// SERVICES
import {
    getCommentsService, getCommentService,
    postCommentService,
    patchCommentService,
    deleteCommentService
} from "../service/index.js";

// SCHEMA
import { AppError } from "../schema/AppError.js";


export async function getCommentsController(req, res, next) {
    const query = req.query;

    return getCommentsService(query)
        .then((response) => {
            if (!response) return res.status(404).send({ err_msg: "404: Not Found" });

            const { total, totalPages, comments } = response;

            return res.status(200).json({ total, totalPages, comments });
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


export async function getCommentController(req, res, next) {
    const { commentId } = req.params;

    return getCommentService(commentId)
        .then((comment) => {
            if (!comment) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ comment });
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


export async function postCommentController(req, res, next) {
    const data = req.body;

    let comment;

    return postCommentService(data)
        .then((response) => {
            if (!response) return res.status(404).send({ err_msg: "404: Not Found" })
            
            comment = response;
            return comment;
        })
        .then(() => {
            return res.status(201).send({
                msg: "Comment posted successfully!",
                comment
            })
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


export async function patchCommentController(req, res, next) {
    const { commentId } = req.params;
    const patch = req.body;

    return patchCommentService(commentId, patch)
        .then((comment) => {
            if (!comment) return res.status(404).send({ err_msg: "404: Not Found" });

            return res.status(200).send({ 
                msg: "Comment patched successfully!",
                comment
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


export async function deleteCommentController(req, res, next) {
    const { commentId } = req.params;

    return deleteCommentService(commentId)
        .then((comment) => {
            if (!comment) return res.status(404).send({ err_msg: "404: Not Found" })
            
            return res.status(200).send({ 
                msg: "Comment deleted successfully!",
                comment 
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
};