import { queryValidationSchema } from "../../schema/queryValidation.schema";
import { getInventories, getInventory } from "../../models";
import { ObjectIdSchema } from "../../schema/z";

export async function getInventoriesController(req, res, next) {
    const parsed = queryValidationSchema.safeParse(req.query);

    if (!parsed.success) {
        return res.status(400).json(parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'filled', 'slots', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        return res.status(400).json({
            error: "Invalid sort query"
        });
    };

    return getInventories({ ...parsed.data })
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ ...data });
        })
        .catch((err) => { next(err) });
};


export async function getInventoryController(req, res, next) {
    const { inventoryId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(inventoryId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid inventory ID",
            issues: parsedId.error.issues
        });
    };

    return getInventory(parsedId.data)
        .then((inventory) => {
            if (!inventory) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ inventory });
        })
        .catch((err) => { next(err) })
};