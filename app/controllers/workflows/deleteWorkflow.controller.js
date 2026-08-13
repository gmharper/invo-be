// MODELS
import { deleteWorkflow } from "../../models";

// SCHEMA
import { Comment } from "../../schema/commentEntry.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { User } from "../../schema/user.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export default async function deleteWorkflowController(req, res, next) {
    const { workflowId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(workflowId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid workflow ID",
            issues: parsedId.error.issues
        });
    };

    const id = parsedId.data;
    let workflow;

    // delete from user
    // delete history

    return deleteWorkflow(id)
        .then((response) => {
            if (!response) return res.status(404).send({ err_msg: "404: Not Found" });
            
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
            return res.status(200).json({
                msg: "Workflow deleted successfully!",
                workflowId: id,
                workflow
            });
        })
        .catch((err) => { next(err) })
};