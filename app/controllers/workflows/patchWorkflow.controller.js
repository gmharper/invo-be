// MODELS
import { patchWorkflow } from "../../models/index.js";

// SCHEMA
import { WorkflowZSchema } from "../../schema/workflow.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export default async function patchWorkflowController(req, res, next) {
    const { workflowId } = req.params;
    const data = req.body;

    const parsedId = ObjectIdSchema.safeParse(workflowId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid workflow ID",
            issues: parsedId.error.issues
        });
    };

    const parsed = WorkflowZSchema.parse(data);

    const blacklist = [
        "_id", 
        "comments", "history", "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchWorkflow(parsedId.data, parsed)
        .then((workflow) => {
            if (!workflow) return res.status(404).send({ err_msg: "404: Not Found" });

            return res.status(200).send({ 
                msg: "Workflow patched successfully!",
                workflow 
            });
        })
        .catch((err) => { next(err) })
};