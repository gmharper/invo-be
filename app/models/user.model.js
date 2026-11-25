import { User } from '../schema/user.schema.js';

export async function getUsers(props) {
    const total = await User.countDocuments();

    const { sort, order, limit, p } = props;

    const users = await User.find()
        .sort({ [sort]:order })
        .skip(p * limit).limit(limit)
        .lean()

    return {
        total,
        totalPages: Math.ceil(total / limit),
        users
    };
};

export async function getUser(id) {
    const user = await User.findOne({ _id:id })
        .lean()

    return user;
};

export async function postUser(user) {
    const result = await User.insertOne({ ...user });

    return result.toObject();
};

export async function patchUser(id, patch) {
    const user = await User.findOneAndUpdate(
        { _id:id }, 
        { $set:{...patch} }, 
        { returnDocument:'after' }
    );

    return user;
};

export async function clearUser(id) {

};

export async function deleteUser(id) {
    const user = await User.findOneAndDelete({ _id:id });

    return user;
};