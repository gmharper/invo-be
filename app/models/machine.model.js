import { Machine } from '../schema/machine.schema.js';

export async function getMachines(props) {
    const total = await Machine.countDocuments();

    const { sort, order, limit, p, author } = props;

    let query = Machine.find(author ? { author } : {}).sort({ [sort]:order });

    if (!author) {
        query = query.skip(p * limit).limit(limit)
    };

    const machines = await query.lean()

    return {
        total,
        totalPages: Math.ceil(total / limit),
        machines
    };
};

export async function getMachine(id) {
    const machine = await Machine.findOne({ _id:id })
        .lean()

    return machine;
};

export async function postMachine(machine) {
    const result = await Machine.insertOne({ ...machine })

    return result.toObject();
};

export async function patchMachine(id, patch) {
    const machine = await Machine.findOneAndUpdate(
        { _id:id }, 
        { $set:{...patch} }, 
        { returnDocument:'after' }
    )

    return machine;
}

export async function clearMachine(id) {

};

export async function deleteMachine(id) {
    const machine = await Machine.findOneAndDelete({ _id:id });

    return machine;
};