import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';
import { ObjectId } from 'mongodb';

/////////////////////////////////////////
describe("GET /api/comments", () => {
    test("200: returns the comments", () => {
        return request(app)
            .get(`/api/comments`)
            .expect(200)
            .then((res) => {
                const comments = res.body.comments;
                expect(comments.length).toEqual(24)

                comments.forEach((comment) => {
                    expect(comment).toEqual(
                        expect.objectContaining({
                            _id: expect.any(String),
                            refId: expect.any(String),
                            type: expect.any(String),
                            body: expect.any(String),

                            author: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String)
                        })
                    );
                });
            })
    })
});

///////////////////////////////////////
describe("Get /api/comments", () => {
    test("200: returns only a number of comments defined by limit query", () => {
        return request(app)
            .get('/api/comments?limit=2')
            .expect(200)
            .then((res) => {
                expect(res.body.comments.length).toEqual(2)
            })
    })
});

describe("Get /api/comments?limit=700", () => {
    test("200: number returned doesn't exceed the maximum limit", () => {
        return request(app)
            .get('/api/comments?limit=700')
            .expect(200)
            .then((res) => {
                expect(res.body.comments.length).toEqual(24)
            })
    })
});

describe("Get /api/comments?limit=-1", () => {
    test("400: When limit query is invalid", () => {
        return request(app)
            .get('/api/comments?limit=-1')
            .expect(400)
    })
});


describe("GET /api/comments?author=6a75eae8292c72785545b036", () => {
    test("200: Get comments by author", () => {
        return request(app)
            .get('/api/comments?author=6a75eae8292c72785545b033')
            .expect(200)
            .then((res) => {
                expect(res.body.comments.length).toEqual(10);
            })
    })
});

describe("GET /api/comments?refId=6a7511150930fd3868490c99", () => {
    test("200: Get comments by refId (by item)", () => {
        return request(app)
            .get('/api/comments?refId=6a7511150930fd3868490c99')
            .expect(200)
            .then((res) => {
                expect(res.body.comments.length).toEqual(5);
            })
    })
});

///////////////////////////////////////
describe("GET /api/comments/:commentId", () => {
    test("200: returns a comment by its id", () => {
        return request(app)
            .get(`/api/comments/6a7b7523f90647a55640dcc7`)
            .expect(200)
            .then((res) => {
                expect(res.body.comment.body).toEqual("inventory1 comment1")
            });
    })
});


// BAD REQUESTS
describe("GET bad requests", () => {
    test("400: Invalid comment Id", () => {
        return request(app)
            .get('/api/comments/comment1')
            .expect(400)
    });

    test("404: comment Id that does not exist", () => {
        return request(app)
            .get('/api/comments/1a7d21d34bbcae225dd3f69a')
            .expect(404)
    });
});