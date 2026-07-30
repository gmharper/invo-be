import { Item } from '../schema/item.schema.js';

export async function getItems(props) {
    const total = await Item.countDocuments();

    const { sort, order, limit, p } = props;

    const items = await Item.find()
        .sort({ [sort]:order })
        .skip(p * limit).limit(limit)
        .lean()

    return {
        total,
        totalPages: Math.ceil(total / limit),
        items
    };
};


export async function getItem(id) {
    const item = Item.find({ _id:id })
        .lean();

    return item;
};


export async function postItem(item) {
    const result = Item.insertOne({ ...item });

    return result;
};

export async function patchItem(id, item) {
    const result = Item.updateOne({ _id:id }, { $set:item });

    return result;
};


export async function clearItem(id) {

};


export async function deleteItem(id) {
    const result = Item.deleteOne({ _id:id })

    return result;
};