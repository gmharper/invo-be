import express from "express";

import {
    getUserPreferencesController,
    patchUserPreferencesController
} from "../controllers/userPreferences.controller";

export const preferencesRouter = express.Router();

preferencesRouter.route("/:id")
    .get(getUserPreferencesController)
    .post((req, res) => res.status(405).send("This endpoint does nothing! Use patch instead."))
    .patch(patchUserPreferencesController)
    .delete((req, res) => res.status(405).send("This endpoint does nothing!"))