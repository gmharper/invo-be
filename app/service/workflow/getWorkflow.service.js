// MODELS
import { getWorkflows, getWorkflow } from "../../models/index.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getWorkflowsService(query) {
    const parsed = queryValidationSchema.safeParse(query);

    if (!parsed.success) {
        throw new AppError("Invalid query.", 400, parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'nodes', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        throw new AppError("Invalid sort query.", 400, null);
    };

    return getWorkflows({ ...parsed.data })
        .then((data) => {
            if (!data || !data.workflows) throw new AppError("404: Not found", 404, null);
            
            return data;
        });
};

export async function getWorkflowService(workflowId) {
    const parsedId = ObjectIdSchema.safeParse(workflowId);
    
    if (!parsedId.success) {
        throw new AppError("Invalid workflow ID.", 400, parsedId.error.format());
    };

    return getWorkflow(parsedId.data)
        .then((workflow) => {
            if (!workflow) throw new AppError("404: Not found", 404, null);
            
            return workflow;
        });
};