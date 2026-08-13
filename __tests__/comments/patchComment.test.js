import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("PATCH /api/comments", () => {
    const patch = {
        body: "Patched comment"
    };

    test("405: does nothing", () => {
        return request(app)
            .patch(`/api/comments`)
            .send(patch)
            .expect(405)
    })
});

///////////////////////////////////////
describe("PATCH /api/comments/:commentId", () => {
    const patch = {
        body: 'Patched comment'
    };

    test("200: patches a comment by its id", () => {
        return request(app)
            .patch(`/api/comments/6a7b7523f90647a55640dcc7`)
            .send(patch)
            .expect(200)
            .then((response) => {
                expect(response.body.msg).toEqual("Comment patched successfully!")
            });
    })
});


/////////////////////////////////////////
// BAD REQUESTS
describe("Bad request PATCH /api/comments/:commentId", () => {
    const patch = {
        name: "Patched comment"
    };

    test("400: invalid commentId", () => {
        return request(app)
            .patch('/api/comments/myComment')
            .send(patch)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid comment ID")
            })
    });

    const bad_patch1 = {
        _id: new ObjectId(),
        refId: new ObjectId(),
        type: "item",
        body: 'Patched comment',
        author: new ObjectId()
    };

    test("200: cannot patch certain fields", () => {
        return request(app)
            .patch('/api/comments/6a7b7523f90647a55640dcc7')
            .send(bad_patch1)
            .expect(200)
            .then((res) => {
                expect(res.body.comment._id).toEqual("6a7b7523f90647a55640dcc7") // test inventory1 comment1
                expect(res.body.comment.refId).toEqual("6a7511150930fd3868490c99");
                expect(res.body.comment.type).toEqual("inventory");
                expect(res.body.comment.body).toEqual("Patched comment")
                expect(res.body.comment.author).toEqual("6a75f003ada1ee425aa74af9") // gmharper
            })
    });
})