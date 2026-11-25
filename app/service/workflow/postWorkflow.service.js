// MODELS
import { postWorkflow } from "../../models/workflow.model.js";

// SCHEMA
import { History } from "../../schema/historyEntry.schema.js";
import { WorkflowZSchema } from "../../schema/workflow.schema.js";
import { AppError } from "../../schema/AppError.js";
import { ObjectId } from "mongodb";

export async function postWorkflowService(workflow) {
    const parsed = WorkflowZSchema.safeParse(workflow);
    if (!parsed.success) {
        throw new AppError("Error parsing posted workflow.", 400, parsed.error.format());
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdWorkflow = { ...parsed.data };

    return postWorkflow(createdWorkflow)
        .then((data) => {
            if (!data) return;
            
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
            return createdWorkflow;
        });
};