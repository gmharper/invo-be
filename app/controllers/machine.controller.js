import {
    getMachinesService,
    getMachineService,
    postMachineService,
    patchMachineService,
    deleteMachineService
} from "../service/index.js";

import { ZodError } from "zod";
import { AppError } from "../schema/AppError.js";

export async function getMachinesController(req, res, next) {
    const query = req.query;

    return getMachinesService(query)
        .then((response) => {
            if (!response || !response.machines) return res.status(404);

            const { total, totalPages, machines } = response;

            return res.status(200).json({
                total, totalPages,
                machines
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

export async function getMachineController(req, res, next) {
    const { machineId } = req.params;

    return getMachineService(machineId)
        .then((machine) => {
            if (!machine) return res.status(404);

            return res.status(200).json({ machine });
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

export async function postMachineController(req, res, next) {
    const machine = req.body;

    return postMachineService(machine)
        .then((machine) => {
            if (!machine) return res.status(404);

            return res.status(201).json({
                msg: "Machine posted successfully!",
                machine
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

export async function patchMachineController(req, res, next) {
    const { machineId } = req.params;
    const patch = req.body;

    patchMachineService(machineId, patch)
        .then((machine) => {
            if (!machine) return res.status(404);

            return res.status(200).json({
                msg: "Machine patched successfully!",
                machine
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

export async function deleteMachineController(req, res, next) {
    const { machineId } = req.params

    return deleteMachineService(machineId)
        .then((machine) => {
            if (!machine) return res.status(404).send({ })

            return res.status(200).json({
                msg: "Machine deleted successfully!",
                machine
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