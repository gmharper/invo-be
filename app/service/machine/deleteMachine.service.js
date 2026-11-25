// MODELS
import { deleteMachine } from "../../models/index.js";

// SCHEMA
import { Comment } from "../../schema/commentEntry.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { User } from "../../schema/user.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function deleteMachineService(machineId) {
    const parsedId = ObjectIdSchema.safeParse(machineId);

    if (!parsedId.success) {
        throw new AppError("Invalid machine ID.", 400, parsedId.error.format());
    };

    const id = parsedId.data;
    let machine;

    return deleteMachine(id)
        .then((response) => {
            if (!response) return;
            
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
            return machine;
        });
};