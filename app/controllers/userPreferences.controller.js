// SERVICES
import {
    getUserPreferencesService,
    patchUserPreferencesService
} from "../service/index.js";

// SCHEMA
import { AppError } from "../schema/AppError.js";

export async function getUserPreferencesByRef(req, res, next) {
    const { refId } = req.params;

    req.params.id = refId;

    getUserPreferencesController(req, res, next, true);
};

export async function getUserPreferencesController(req, res, next, useRef=false) {
    const { id } = req.params

    return getUserPreferencesService(id, false)
        .then((preferences) => {
            if (!preferences) return res.status(404).send({ err_msg: "404: Not Found" });

            return res.status(200).json({ preferences });
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

/////////////////////////
export async function patchUserPreferencesByRef(req, res, next) {
    const { refId } = req.params;

    req.params.id = refId;

    patchUserPreferencesController(req, res, next, true)
};

export async function patchUserPreferencesController(req, res, next, useRef=false) {
    const { id } = req.params;
    const patch = req.body;

    return patchUserPreferencesService(id, patch)
        .then((preferences) => {
            if (!preferences) return res.status(404).send({ err_msg: "404: Not Found" });
            
            return res.status(200).json({ 
                msg: "User preferences patched successfully!",
                preferences 
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