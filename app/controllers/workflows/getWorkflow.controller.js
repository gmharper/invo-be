// MODELS
import { getWorkflows, getWorkflow } from "../../models";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function getWorkflowsController(req, res, next) {
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

    return getWorkflows({ ...parsed.data })
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ ...data });
        })
        .catch((err) => { next(err) });
};


export async function getWorkflowController(req, res, next) {
    const { workflowId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(workflowId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid workflow ID",
            issues: parsedId.error.issues
        });
    };

    return getWorkflow(parsedId.data)
        .then((workflow) => {
            if (!workflow) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ workflow });
        })
        .catch((err) => { next(err) })
};