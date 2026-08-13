// MODELS
import { deleteMachine } from "../../models/index.js";

// SCHEMA
import { Comment } from "../../schema/commentEntry.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { User } from "../../schema/user.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function deleteMachineController(req, res, next) {
    const { machineId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(machineId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid machine ID",
            issues: parsedId.error.issues
        });
    };

    const id = parsedId.data;
    let machine;

    return deleteMachine(id)
        .then((response) => {
            if (!response) return res.status(404).send({ err_msg: "404: Not Found" });
            
            machine = response;

            return User.updateOne(
                { _id: machine.author },
                { $pull: { machines: machine._id }},
                { $pull: { "favourites.machines": machine._id }}
            );
        })
        .then(() => {
            return Comment.deleteMany({ _id: { $in:machine.comments }})
        })
        .then(() => {
            return History.deleteOne({ _id: machine.history });
        })
        .then(() => {
            return res.status(200).json({
                msg: "Machine deleted successfully!",
                machineId: id,
                machine
            });
        })
        .catch((err) => { next(err) });
};