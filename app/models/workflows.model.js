import { Workflow } from '../schema/workflow.schema.js';

export async function getWorkflows(props) {
    const total = await Workflow.countDocuments();

    const { sort, order, limit, p } = props;

    const workflows = await Workflow.find()
        .sort({ [sort]:order })
        .skip(p * limit).limit(limit)
        .lean()

    return {
        total,
        totalPages: Math.ceil(total / limit),
        workflows
    };
};

export async function getWorkflow(id) {
    const workflow = Workflow.find({ _id:id })
        .lean()

    return workflow;
};

export async function postWorkflow(workflow) {
    const result = Workflow.insertOne({ ...workflow })

    return result;
};

export async function patchWorkflow(id, workflow) {
    const result = Workflow.updateOne({ _id:id }, { $set:workflow })

    return result;
}

export async function clearWorkflow(id) {

};

export async function deleteWorkflow(id) {
    const result = Workflow.deleteOne({ _id:id })

    return result;
};