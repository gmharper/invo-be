// MODELS
import { deleteWorkflow } from "../../models/index.js";
import { AppError } from "../../schema/AppError.js";

// SCHEMA
import { Comment } from "../../schema/commentEntry.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { User } from "../../schema/user.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function deleteWorkflowService(workflowId) {
    const parsedId = ObjectIdSchema.safeParse(workflowId);

    if (!parsedId.success) {
        throw new AppError("Invalid workflow ID.", 400, parsedId.error.format());
    };

    const id = parsedId.data;
    let workflow;

    return deleteWorkflow(id)
        .then((response) => {
            if (!response) return;
            
            workflow = response;

            return User.updateOne(
                { _id: workflow.author },
                { $pull: { workflows: workflow._id }},
                { $pull: { "favourites.workflows": workflow._id }}
            );
        })
        .then(() => {
            return Comment.deleteMany({ _id: { $in:workflow.comments }})
        })
        .then(() => {
            return History.deleteOne({ _id: workflow.history });
        })
        .then(() => {
            return workflow;
        })
};