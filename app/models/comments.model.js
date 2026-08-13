import { Comment } from "../schema/commentEntry.schema";

export async function getComments(props) {
    const total = await Comment.countDocuments();

    const { sort, order, limit, p, author, refId } = props;

    let findQuery = {};
    if (author != null) findQuery.author = author;
    if (refId != null) findQuery.refId = refId;

    let query = Comment.find(findQuery).sort({ [sort]:order });

    if (!author && !refId) {
        query = query.skip(p * limit).limit(limit);
    };

    const comments = await query.lean();

    return {
        total,
        totalPages: Math.ceil(total / limit),
        comments
    };
};

export async function getComment(id) {
    const comment = await Comment.find({ _id:id })
        .lean();

    return comment[0];
};


export async function postComment(comment) {
    try {
        const result = await Comment.insertOne({ ...comment });
        return result.toObject();
    } catch (err) {
        console.error(err);
    };
};

export async function patchComment(id, patch) {
    const comment = await Comment.findOneAndUpdate(
        { _id:id }, 
        { $set:{...patch} }, 
        { returnDocument:'after' }
    );

    return comment;
};


export async function deleteComment(id) {
    const comment = await Comment.findOneAndDelete({ _id:id });

    return comment;
};