// SERVICES
import { 
    getInventoriesService, 
    getInventoryService, 
    postInventoryService, 
    patchInventoryService, 
    deleteInventoryService 
} from "../service/index.js";

// SCHEMA
import { AppError } from "../schema/AppError.js";

export async function getInventoriesController(req, res, next) {
    const query = req.query;

    return getInventoriesService(query)
        .then((response) => {
            if (!response || !response.inventories) return res.status(404);

            const { total, totalPages, inventories } = response;

            return res.status(200).json({
                total, totalPages,
                inventories
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

export async function getInventoryController(req, res, next) {
    const { inventoryId } = req.params;

    return getInventoryService(inventoryId)
        .then((inventory) => {
            if (!inventory) return res.status(404);

            return res.status(200).json({ inventory });
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

export async function postInventoryController(req, res, next) {
    const inventory = req.body;

    return postInventoryService(inventory)
        .then((inventory) => {
            if (!inventory) return res.status(404);

            return res.status(201).json({
                msg: "Inventory posted successfully!",
                inventory
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

export async function patchInventoryController(req, res, next) {
    const { inventoryId } = req.params;
    const patch = req.body;

    return patchInventoryService(inventoryId, patch)
        .then((inventory) => {
            if (!inventory) return res.status(404);

            return res.status(200).json({
                msg: "Inventory patched successfully!",
                inventory
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

export async function deleteInventoryController(req, res, next) {
    const { inventoryId } = req.params

    return deleteInventoryService(inventoryId)
        .then((inventory) => {
            if (!inventory) return res.status(404);

            return res.status(200).json({
                msg: "Inventory deleted successfully!",
                inventory
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