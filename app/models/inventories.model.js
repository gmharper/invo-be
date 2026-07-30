import { Inventory } from '../schema/inventory.schema.js';

export async function getInventories(props) {
    const total = await Inventory.countDocuments();

    const { sort, order, limit, p } = props;

    const inventories = await Inventory.find()
        .sort({ [sort]:order })
        .skip(p * limit).limit(limit)
        .lean()

    return {
        total,
        totalPages: Math.ceil(total / limit),
        inventories
    };
};

export async function getInventory(id) {
    const inventory = Inventory.find({ _id:id })
        .lean()

    return inventory;
};

export async function postInventory(inventory) {
    const result = Inventory.insertOne({ ...inventory })

    return result
};

export async function patchInventory(id, inventory) {
    const result = Inventory.updateOne({ _id:id }, { $set:inventory })

    return result;
}

export async function clearInventory(id) {

};

export async function deleteInventory(id) {
    const result = Inventory.deleteOne({ _id:id })

    return result;
};