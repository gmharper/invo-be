// MODELS
import { postWorkflow } from "../../models/index.js";

// SCHEMA
import { History } from "../../schema/historyEntry.schema.js";
import { WorkflowZSchema } from "../../schema/workflow.schema.js";
import { ObjectId } from "mongodb";

export default async function postWorkflowController(req, res, next) {
    const data = req.body;

    const parsed = WorkflowZSchema.safeParse(data);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Error parsing posted workflow",
            error: parsed.error.issues
        });
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdWorkflow = { ...parsed.data };

    return postWorkflow(createdWorkflow)
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            
            return History.create({
                _id: historyId,
                refId: createdWorkflow._id,
                type: "workflow",
                entries: [
                    { author:createdWorkflow.author, action:"WORKFLOW_CREATED", body:"", timestamp:createdWorkflow.createdAt }
                ],
                createdAt: createdWorkflow.createdAt,
                updatedAt: createdWorkflow.updatedAt
            });
        })
        .then((history) => {
            if (!history) return;

            return res.status(201).json({
                msg: "Workflow created successfully!",
                workflow: createdWorkflow,
                history
            });
        })
        .catch((err) => { next(err) });
};