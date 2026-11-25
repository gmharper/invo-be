// MODELS
import { postMachine } from "../../models/index.js";

// SCHEMA
import { History } from "../../schema/historyEntry.schema.js";
import { MachineZSchema } from "../../schema/machine.schema.js";
import { AppError } from "../../schema/AppError.js";
import { ObjectId } from "mongodb";

export async function postMachineService(machine) {
    const parsed = MachineZSchema.safeParse(machine);
    
    if (!parsed.success) {
        throw new AppError("Error parsing posted machine.", 400, parsed.error.format());
    };

    const historyId = new ObjectId();
    parsed.data.history = historyId;
    let createdMachine = { ...parsed.data };

    return postMachine(createdMachine)
        .then((data) => {
            if (!data) return;
            
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
            return createdMachine;
        });
};