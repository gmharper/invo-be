// MODELS
import { getComments, getComment } from "../../models/comment.model.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getCommentsService(query) {
    const parsed = queryValidationSchema.safeParse(query);

    if (!parsed.success) {
        throw new AppError("Invalid query.", 400, parsed.error.format());
    };

    const validSorts = ['_id', 'type', 'author', 'createdAt', 'updatedAt'];
    if (parsed.data.sort && !validSorts.includes(parsed.data.sort)) {
        throw new AppError("Invalid sort query.", 400, null);
    };

    return getComments(parsed.data)
        .then((data) => {
            if (!data || !data.comments) throw new AppError("404: Not found", 404, null);

            return data;
        });
};


export async function getCommentService(commentId) {
    const parsedId = ObjectIdSchema.safeParse(commentId);
    
    if (!parsedId.success) {
        throw new AppError("Invalid comment ID.", 400, parsedId.error.format());
    };

    return getComment(parsedId.data)
        .then((comment) => {
            if (!comment) throw new AppError("404: Not found", 404, null);

            return comment;
        });
};