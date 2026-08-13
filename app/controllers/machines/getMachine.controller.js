import { getMachines, getMachine } from "../../models";
import { queryValidationSchema } from "../../schema/queryValidation.schema";
import { ObjectIdSchema } from "../../schema/z";

export async function getMachinesController(req, res, next) {
    const parsed = queryValidationSchema.safeParse(req.query);

    if (!parsed.success) {
        return res.status(400).json(parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'nodes', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        return res.status(400).json({
            error: "Invalid sort query"
        });
    };

    return getMachines({ ...parsed.data })
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ ...data });
        })
        .catch((err) => { next(err) });
};


export async function getMachineController(req, res, next) {
    const { machineId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(machineId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid machine ID",
            issues: parsedId.error.issues
        })
    };

    return getMachine(parsedId.data)
        .then((machine) => {
            if (!machine) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ machine });
        })
        .catch((err) => { next(err) })
};