// MODELS
import { 
    getItemsService, 
    getItemService, 
    postItemService, 
    patchItemService, 
    deleteItemService 
} from "../service/index.js";

import { AppError } from "../schema/AppError.js";

export async function getItemsController(req, res, next) {
    const query = req.query;

    return getItemsService(query)
        .then((response) => {
            if (!response || !response.items) return res.status(404);

            const { total, totalPages, items } = response;

            return res.status(200).json({
                total, totalPages,
                items
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

export async function getItemController(req, res, next) {
    const { itemId } = req.params;

    return getItemService(itemId)
        .then((item) => {
            if (!item) return res.status(404);

            return res.status(200).json({ item });
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

export async function postItemController(req, res, next) {
    const item = req.body;

    return postItemService(item)
        .then((item) => {
            if (!item) return res.status(404);

            return res.status(201).json({
                msg: "Item posted successfully!",
                item
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

export async function patchItemController(req, res, next) {
    const { itemId } = req.params;
    const patch = req.body;

    return patchItemService(itemId, patch)
        .then((item) => {
            if (!item) return res.status(404);

            return res.status(200).json({
                msg: "Item patched successfully!",
                item
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

export async function deleteItemController(req, res, next) {
    const { itemId } = req.params;

    return deleteItemService(itemId)
        .then((item) => {
            if (!item) return res.status(404);

            return res.status(201).json({
                msg: "Item deleted successfully!",
                item
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