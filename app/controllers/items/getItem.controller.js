// MODELS
import { getItems, getItem } from "../../models/index.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function getItemsController(req, res, next) {
    const parsed = queryValidationSchema.safeParse(req.query);

    if (!parsed.success) {
        return res.status(400).json(parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        return res.status(400).json({
            error: "Invalid sort query",
        });
    };

    return getItems({ ...parsed.data })
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ ...data });
        })
        .catch((err) => { next(err) });
};


export async function getItemController(req, res, next) {
    const { itemId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(itemId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid item ID",
            issues: parsedId.error.issues
        });
    };

    return getItem(parsedId.data)
        .then((item) => {
            if (!item) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ item });
        })
        .catch((err) => { next(err) })
};