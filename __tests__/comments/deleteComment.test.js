import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("DELETE /api/comments", () => {
    test("405: does nothing", async () => {
        return request(app)
            .delete(`/api/comments`)
            .expect(405)
    })
});

///////////////////////////////////////
describe("DELETE /api/comments/:commentId", () => {
    test("200: deletes a comment by its id", () => {
        return request(app)
            .delete(`/api/comments/6a7b7523f90647a55640dcc7`)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("Comment deleted successfully!");
            });
    })
});