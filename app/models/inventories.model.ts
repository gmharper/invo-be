import { connectDB } from '../../db/connection';

export async function getInventories(ids:Array<string>) {
    const db = await connectDB();

    const inventories = await db.collection("inventories")
        .find({ id:{ $in:ids }})
        .toArray();

    return inventories;
};

export async function getInventory(id:string) {
    const db = await connectDB();

    const inventory = await db.collection("inventories")
        .find({ id:id })
        .toArray();

    return inventory;
};

export async function postInventory(inventory:any) {
    const db = await connectDB();

    const result = await db.collection("inventories")
        .insertOne({ ...inventory })

    return result
};

export async function patchInventory(id:string, inventory:any) {
    const db = await connectDB();

    const result = await db.collection("inventories")
        .updateOne({ id }, { $set:inventory })

    return result;
}

export async function clearInventory(id:string) {

};

export async function deleteInventory(id:string) {
    const db = await connectDB();

    const inventory = await db.collection("inventories")
        .deleteOne({ id:id })

    return inventory;
};