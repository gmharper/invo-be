// MODELS
import { patchMachine } from "../../models/index.js";

// SCHEMA
import { MachineZSchema } from "../../schema/machine.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function patchMachineService(machineId, patch) {
    const parsedId = ObjectIdSchema.safeParse(machineId);
    
    if (!parsedId.success) {
        throw new AppError("Invalid machine ID.", 400, parsedId.error.format());
    };

    const parsed = MachineZSchema.parse(patch);

    const blacklist = [
        "_id", 
        "history", "comments", "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchMachine(parsedId.data, parsed)
        .then((machine) => {
            if (!machine) throw new AppError("404: Not found", 404, null);
            
            return machine;
        });
};