// MODELS
import { deleteComment } from "../../models/comment.model.js"

// SCHEMA
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function deleteCommentService(commentId) {
    const parsedId = ObjectIdSchema.safeParse(commentId);

    if (!parsedId.success) {
        throw new AppError("Invalid comment ID", 400, parsedId.error.format());
    };

    const id = parsedId.data;

    return deleteComment(id)
        .then((comment) => {
            return comment;
        });
};