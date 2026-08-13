// MODELS
import { patchMachine } from "../../models/index.js";

//SCHEMA
import { MachineZSchema } from "../../schema/machine.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export async function patchMachineController(req, res, next) {
    const { machineId } = req.params;
    const data = req.body;

    const parsedId = ObjectIdSchema.safeParse(machineId)
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid machine ID",
            issues: parsedId.error.issues
        });
    };

    const parsed = MachineZSchema.parse(data);

    const blacklist = [
        "_id", 
        "history", "comments", "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchMachine(parsedId.data, parsed)
        .then((machine) => {
            if (!machine) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ 
                msg: "Machine patched successfully!",
                machine 
            });
        })
        .catch((err) => { next(err) })
};