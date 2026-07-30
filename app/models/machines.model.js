import { Machine } from '../schema/machine.schema.js';

// WE MUST delete certain keys from the user object before returning for example:
// passwordHash

export async function getMachines(props) {
    const total = await Machine.countDocuments();

    const { sort, order, limit, p } = props;

    const machines = await Machine.find()
        .sort({ [sort]:order })
        .skip(p * limit).limit(limit)
        .lean()

    return {
        total,
        totalPages: Math.ceil(total / limit),
        machines
    };
};

export async function getMachine(id) {
    const machine = Machine.find({ _id:id })
        .lean()

    return machine;
};

export async function postMachine(machine) {
    const result = Machine.insertOne({ ...machine })

    return result;
};

export async function patchMachine(id, machine) {
    const result = Machine.updateOne({ _id:id }, { $set:machine })

    return result;
}

export async function clearMachine(id) {

};

export async function deleteMachine(id) {
    const machine = Machine.deleteOne({ _id:id })

    return machine;
};