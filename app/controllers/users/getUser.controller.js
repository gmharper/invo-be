// MODELS
import { getUsers, getUser } from "../../models/index.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function getUsersController(req, res, next) {
    const parsed = queryValidationSchema.safeParse(req.query);

    if (!parsed.success) {
        return res.status(400).json(parsed.error.format());
    };

    const validSorts = ['_id', 'username', 'name', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        return res.status(400).json({
            error: "Invalid sort query"
        });
    };

    return getUsers({ ...parsed.data })
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ ...data })
        })
        .catch((err) => { next(err) });
};


export async function getUserController(req, res, next) {
    const { userId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(userId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid user ID",
            issues: parsedId.error.issues
        });
    };

    return getUser(parsedId.data)
        .then((user) => {
            if (!user) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ user });
        })
        .catch((err) => { next(err) })
};