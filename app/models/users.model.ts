import { connectDB } from '../../db/connection';

export async function getUsers(ids:Array<string>) {
    const db = await connectDB();

    const users = await db.collection("users")
        .find({ id:{ $in:ids }})
        .toArray();

    return users;
};

export async function getUser(id:string) {
    const db = await connectDB();

    const user = await db.collection("users")
        .find({ id:id })
        .toArray();

    return user;
};

export async function postUser(user:any) {
    const db = await connectDB();

    const result = await db.collection("users")
        .insertOne({ ...user })

    return result;
};

export async function patchUser(id:string, user:any) {
    const db = await connectDB();

    const result = await db.collection("users")
        .updateOne({ id }, { $set:user })

    return result;
}

export async function clearUser() {
    const db = await connectDB();
};

export async function deleteUser(id:string) {
    const db = await connectDB();

    const user = await db.collection("users")
        .deleteOne({ id:id })

    return user;
};