// MODELS
import { 
    getComments,
    getComment,
    postComment,
    patchComment,
    deleteComment
} from "../models/comments.model.js";

// SCHEMA
import { CommentZSchema } from "../schema/commentEntry.schema.js";
import { queryValidationSchema } from '../schema/queryValidation.schema.js';
import { ObjectIdSchema } from "../schema/z.js";


export async function getCommentsController(req, res, next) {
    const parsed = queryValidationSchema.safeParse(req.query);

    if (!parsed.success) {
        return res.status(400).json({
            msg: "Invalid query",
            error: parsed.error.issues
        });
    };

    const validSorts = ['_id', 'type', 'author', 'createdAt', 'updatedAt'];
    if (parsed.data.sort && !validSorts.includes(parsed.data.sort)) {
        return res.status(400).json({
            msg: "Invalid sort query",
            error: parsed.error.issues
        });
    };

    return getComments(parsed.data)
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ ...data });
        })
        .catch((err) => { next(err) });
};


export async function getCommentController(req, res, next) {
    const { commentId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(commentId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid comment ID",
            issues: parsedId.error.issues
        });
    };

    return getComment(parsedId.data)
        .then((comment) => {
            if (!comment) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ comment });
        })
        .catch((err) => { next(err) })
};


export async function postCommentController(req, res, next) {
    const data = req.body;

    const parsed = CommentZSchema.safeParse(data);
    if (!parsed.success) {
        return res.status(400).json({
            error: "Error parsing posted comment",
            issues: parsed.error.issues
        })
    };

    let comment;

    return postComment(parsed.data)
        .then((response) => {
            if (!response) return res.status(404).send({ err_msg: "404: Not Found" })
            
            comment = response;
            return comment;
        })
        .then(() => {
            return res.status(200).send({
                msg: "Comment posted successfully",
                comment
            })
        })
        .catch((err) => { next(err) });
};


export async function patchCommentController(req, res, next) {
    const { commentId } = req.params;
    const data = req.body;

    const parsedId = ObjectIdSchema.safeParse(commentId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid comment ID",
            issues: parsedId.error.issues
        });
    };

    const parsed = CommentZSchema.parse(data);

    const blacklist = [
        "_id", "refId", "type", "replies",
        "author", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchComment(parsedId.data, parsed)
        .then((comment) => {
            if (!comment) return res.status(404).send({ err_msg: "404: Not Found" });

            else return res.status(200).send({ 
                msg: "Comment patched successfully!",
                comment
            });
        })
        .catch((err) => { next(err) })
};


export async function deleteCommentController(req, res, next) {
    const { commentId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(commentId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid comment ID",
            issues: parsedId.error.issues
        });
    };

    const id = parsedId.data;

    return deleteComment(id)
        .then((comment) => {
            if (!comment) return res.status(404).send({ err_msg: "404: Not Found" })
            else return res.status(200).send({ 
                msg: "Comment deleted successfully!",
                comment 
            })
        })
        .catch((err) => { next(err) })
};