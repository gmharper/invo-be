import { Item } from '../schema/item.schema.js';

export async function getItems(props) {
    const total = await Item.countDocuments();

    const { sort, order, limit, p, author } = props;

    let query = Item.find(author ? { author } : {}).sort({ [sort]:order });

    if (!author) {
        query = query.skip(p * limit).limit(limit)
    };

    const items = await query.lean()

    return {
        total,
        totalPages: Math.ceil(total / limit),
        items
    };
};


export async function getItem(id) {
    const item = await Item.findOne({ _id:id })
        .lean();

    return item;
};


export async function postItem(item) {
    const result = await Item.insertOne({ ...item });

    return result.toObject();
};

export async function patchItem(id, patch) {
    const item = await Item.findOneAndUpdate(
        { _id:id }, 
        { $set:{...patch} }, 
        { returnDocument:'after' }
    );

    return item;
};


export async function clearItem(id) {

};


export async function deleteItem(id) {
    const item = await Item.findOneAndDelete({ _id:id });

    return item;
};