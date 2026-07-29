import { connectDB } from '../../db/connection';

export async function getItems(ids:Array<string>) {
    const db = await connectDB();

    const items = await db.collection("items")
        .find({ id:{ $in:ids }})
        .toArray();

    return items;
};


export async function getItem(id:string) {
    const db = await connectDB();

    const item = await db.collection("items")
        .find({ id:id })
        .toArray();

    return item;
};


export async function postItem(item:any) {
    const db = await connectDB();

    const result = await db.collection("items")
        .insertOne({ ...item })

    return result;
};

export async function patchItem(id:string, item:any) {
    const db = await connectDB();

    const result = await db.collection("items")
        .updateOne({ id }, { $set:item })
}


export async function clearItem(id:string) {

};


export async function deleteItem(id:string) {
    const db = await connectDB();

    const item = await db.collection("items")
        .deleteOne({ id:id })

    return item;
};