import { patchComment } from "../../models/comment.model.js";

// SCHEMA
import { CommentZSchema } from "../../schema/commentEntry.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function patchCommentService(commentId, patch) {
    const parsedId = ObjectIdSchema.safeParse(commentId);

    if (!parsedId.success) {
        throw new AppError("Invalid comment ID.", 400, parsedId.error.format());
    };

    const parsed = CommentZSchema.parse(patch);

    const blacklist = [
        "_id", "refId", "type", "replies",
        "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchComment(parsedId.data, parsed)
        .then((comment) => {
            if (!comment) throw new AppError("404: Not found", 404, null);

            return comment;
        });
};