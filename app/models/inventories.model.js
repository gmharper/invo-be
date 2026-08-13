import { Inventory } from '../schema/inventory.schema.js';

export async function getInventories(props) {
    const total = await Inventory.countDocuments();

    const { sort, order, limit, p, author } = props;

    let query = Inventory.find(author ? { author } : {}).sort({ [sort]:order });

    if (!author) {
        query = query.skip(p * limit).limit(limit)
    };

    const inventories = await query.lean();

    return {
        total,
        totalPages: Math.ceil(total / limit),
        inventories
    };
};

export async function getInventory(id) {
    const inventory = await Inventory.findOne({ _id:id })
        .lean();

    return inventory;
};

export async function postInventory(inventory) {
    try {
        const result = await Inventory.insertOne({ ...inventory });
        return result.toObject();
    } catch (err) {
        console.error(err);
    };
};

export async function patchInventory(id, patch) {
    const inventory = await Inventory.findOneAndUpdate(
        { _id:id }, 
        { $set:{...patch} }, 
        { returnDocument:'after' }
    );

    return inventory;
};

export async function clearInventory(id) {

};

export async function deleteInventory(id) {
    const inventory = await Inventory.findOneAndDelete({ _id:id });

    return inventory;
};