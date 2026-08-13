import express from "express";

import {
    getCommentsController,
    getCommentController,
    postCommentController,
    patchCommentController,
    deleteCommentController
} from "../controllers/comments.controller.js";

export const commentsRouter = express.Router();

commentsRouter.route("/")
  .get(getCommentsController)
  .post(postCommentController)
  .patch((req, res) => res.status(405).send("This endpoint does nothing!"))
  .delete((req, res) => res.status(405).send("This endpoint does nothing!"))

commentsRouter.route("/:commentId")
  .get(getCommentController)
  .post((req, res) => { res.status(405).send("This endpoint does nothing! POST to the /comments endpoint or use PATCH instead") })
  .patch(patchCommentController)
  .delete(deleteCommentController);

