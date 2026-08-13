// MODELS
import {
    getUserPreferences,
    patchUserPreferences
} from "../models/userPreferences.model.js";

// SCHEMA
import { UserPreferencesZSchema } from "../schema/userPreferences.schema.js";
import { ObjectIdSchema } from "../schema/z.js";

export async function getUserPreferencesByRef(req, res, next) {
    const { refId } = req.params;

    req.params.id = refId;

    getUserPreferencesController(req, res, next, true);
};

export async function getUserPreferencesController(req, res, next, useRef=false) {
    const { id } = req.params

    const parsedId = ObjectIdSchema.safeParse(id);
    if (!parsedId.success) {
        return res.status(400).send({
            error: "Invalid preferences ID",
            issues: parsedId.error.issues
        })
    };

    return getUserPreferences(parsedId.data, false)
        .then((preferences) => {
            if (!preferences) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ preferences });
        })
        .catch((err) => { next(err) })
};

/////////////////////////
export async function patchUserPreferencesByRef(req, res, next) {
    const { refId } = req.params;

    req.params.id = refId;

    patchUserPreferencesController(req, res, next, true)
};

export async function patchUserPreferencesController(req, res, next, useRef=false) {
    const { id } = req.params;

    const parsedId = ObjectIdSchema.safeParse(id);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid preferences ID",
            issues: parsedId.error.issues
        })
    };

    const data = req.body;

    const parsed = UserPreferencesZSchema.parse(data);

    const blacklist = [
        "_id", "refId", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchUserPreferences(parsedId.data, parsed)
        .then((preferences) => {
            if (!preferences) return res.status(404).send({ err_msg: "404: Not Found" });
            
            return res.status(200).json({ preferences });
        })
        .catch((err) => { next(err) })
};