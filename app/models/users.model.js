import { User } from '../schema/user.schema.js';

// WE MUST delete certain keys from the user object before returning for example:
// passwordHash

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
    const user = User.find({ _id:id })
        .lean()

    return user;
};

export async function postUser(user) {
    const result = User.insertOne({ ...user })

    return result;
};

export async function patchUser(id, user) {
    const result = User.updateOne({ _id:id }, { $set:user })

    return result;
}

export async function clearUser(id) {

};

export async function deleteUser(id) {
    const result = User.deleteOne({ _id:id })

    return result;
};