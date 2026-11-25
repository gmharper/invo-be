// MODELS
import { postComment } from "../../models/comment.model.js";

// SCHEMA
import { CommentZSchema } from "../../schema/commentEntry.schema.js";
import { AppError } from "../../schema/AppError.js";

export async function postCommentService(data) {
    const parsed = CommentZSchema.safeParse(data);

    if (!parsed.success) {
        throw new AppError("Error parsing posted comment.", 400, parsed.error.format());
    };

    return postComment(parsed.data)
        .then((comment) => {
            return comment;
        });
};