import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';
import { ObjectId } from 'mongodb';

/////////////////////////////////////////
describe("POST /api/comments", () => {
    const comment = {
        _id: new ObjectId(),
        refId: new ObjectId("6a7511150930fd3868490c99"),
        type: "inventory",
        body: "This is a comment.",

        author: new ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    test("200: posts a new comment", () => {
        return request(app)
            .post(`/api/comments`)
            .send(comment)
            .expect(200)
            .then((res) => {
                expect(res.body.comment.body).toEqual("This is a comment.")
            })
    })
});