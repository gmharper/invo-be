// SERVICES
import { 
    getUsersService, 
    getUserService, 
    postUserService, 
    patchUserService, 
    deleteUserService 
} from "../service/index.js";

import { AppError } from "../schema/AppError.js";

export async function getUsersController(req, res, next) {
    const query = req.query;

    // returns total, totalPages, users
    return getUsersService(query)
        .then((response) => {
            if (!response || !response.users) return res.status(404);

            const { total, totalPages, users } = response;

            return res.status(200).json({
                total, totalPages,
                users
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
        });
};

export async function getUserController(req, res, next) {
    const { userId } = req.params;

    // returns user
    return getUserService(userId)
        .then((user) => {
            if (!user) return res.status(404);

            return res.status(200).json({ user });
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

export async function postUserController(req, res, next) {
    const user = req.body;

    // returns user, preferences, history
    return postUserService(user)
        .then((response) => {
            if (!response || !response.user) return res.status(404).send({ err_msg: "404: Not Found" });
            
            const { user, preferences, history } = response;

            return res.status(201).json({
                msg: "User posted successfully!",
                user, preferences, history
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

export async function patchUserController(req, res, next) {
    const { userId } = req.params;
    const patch = req.body;

    // returns user
    return patchUserService(userId, patch)
        .then((user) => {
            if (!user) return res.status(404).send({ err_msg: "404: Not Found" });

            return res.status(200).json({
                msg: "User patched successfully!",
                user
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

export async function deleteUserController(req, res, next) {
    const { userId } = req.params;

    // returns user
    return deleteUserService(userId)
        .then((user) => {
            if (!user) return res.status(404).send({ err_msg: "404: Not Found" });

            return res.status(200).json({
                msg: "User deleted successfully!",
                user
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