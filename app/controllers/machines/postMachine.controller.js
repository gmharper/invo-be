import { ObjectId } from "mongodb";
import { postMachine } from "../../models";
import { History } from "../../schema/historyEntry.schema";
import { MachineZSchema } from "../../schema/machine.schema";

export async function postMachineController(req, res, next) {
    const data = req.body;

    const parsed = MachineZSchema.safeParse(data);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Error parsing posted machine",
            error: parsed.error.issues
        });
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdMachine = { ...parsed.data };

    return postMachine(createdMachine)
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            
            return History.create({
                _id: historyId,
                refId: createdMachine._id,
                type: "machine",
                entries: [
                    { author:createdMachine.author, action:"MACHINE_CREATED", body:"", timestamp:createdMachine.createdAt }
                ],
                createdAt: createdMachine.createdAt,
                updatedAt: createdMachine.updatedAt
            });
        })
        .then((history) => {
            if (!history) return;

            return res.status(201).json({
                msg: "Machine created successfully!",
                machine: createdMachine,
                history
            });
        })
        .catch((err) => { next(err) });
};