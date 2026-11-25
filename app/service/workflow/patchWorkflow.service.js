// MODELS
import { patchWorkflow } from "../../models/workflow.model.js";
import { AppError } from "../../schema/AppError.js";

// SCHEMA
import { WorkflowZSchema } from "../../schema/workflow.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function patchWorkflowService(workflowId, patch) {
    const parsedId = ObjectIdSchema.safeParse(workflowId);

    if (!parsedId.success) {
        throw new AppError("Invalid workflow ID.", 400, parsedId.error.format());
    };

    const parsed = WorkflowZSchema.parse(patch);

    const blacklist = [
        "_id", 
        "comments", "history", "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchWorkflow(parsedId.data, parsed)
        .then((workflow) => {
            if (!workflow) throw new AppError("404: Not found", 404, null);
            
            return workflow;
        });
};