import { Workflow } from '../schema/workflow.schema.js';

export async function getWorkflows(props) {
    const total = await Workflow.countDocuments();

    const { sort, order, limit, p, author } = props;

    let query = Workflow.find(author ? { author } : {}).sort({ [sort]:order });

    if (!author) {
        query = query.skip(p * limit).limit(limit)
    };

    const workflows = await query.lean();

    return {
        total,
        totalPages: Math.ceil(total / limit),
        workflows
    };
};

export async function getWorkflow(id) {
    const workflow = await Workflow.findOne({ _id:id })
        .lean()

    return workflow;
};

export async function postWorkflow(workflow) {
    const result = await Workflow.insertOne({ ...workflow })

    return result.toObject();
};

export async function patchWorkflow(id, patch) {
    const workflow = await Workflow.findOneAndUpdate(
        { _id:id }, 
        { $set:{...patch} }, 
        { returnDocument:'after' }
    );

    return workflow;
};

export async function clearWorkflow(id) {

};

export async function deleteWorkflow(id) {
    const workflow = await Workflow.findOneAndDelete({ _id:id })

    return workflow;
};