// MODELS
import { getMachines, getMachine } from "../../models/machine.model.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getMachinesService(query) {
    const parsed = queryValidationSchema.safeParse(query);

    if (!parsed.success) {
        throw new AppError("Invalid query.", 400, parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'nodes', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        throw new AppError("Invalid sort query.", 400, null);
    };

    return getMachines({ ...parsed.data })
        .then((data) => {
            if (!data || !data.machines) throw new AppError("404: Not found", 404, null);
            
            return data;
        });
};


export async function getMachineService(machineId) {
    const parsedId = ObjectIdSchema.safeParse(machineId);
    
    if (!parsedId.success) {
        throw new AppError("Invalid machine ID.", 400, parsedId.error.format());
    };

    return getMachine(parsedId.data)
        .then((machine) => {
            if (!machine) throw new AppError("404: Not found", 404, null);

            return machine;
        });
};