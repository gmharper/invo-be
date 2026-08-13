import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("GET /api/users", () => {
    test("200: returns the users", () => {
        return request(app)
            .get(`/api/users`)
            .expect(200)
            .then((res) => {
                const users = res.body.users;

                users.forEach((user) => {
                    expect(user).toEqual(
                        expect.objectContaining({
                            _id: expect.any(String),
                            username: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String)
                        })
                    );
                });
            })
    })
});

///////////////////////////////////////
describe("Get /api/users", () => {
    test("200: returns only a number of users defined by limit query", () => {
        return request(app)
            .get('/api/users?limit=2')
            .expect(200)
            .then((res) => {
                expect(res.body.users.length).toEqual(2)
            })
    })
});


///////////////////////////////////////
describe("GET /api/users/:userId", () => {
    test("200: returns a user by its id", () => {
        return request(app)
            .get(`/api/users/6a75eae8292c72785545b039`)
            .expect(200)
            .then((res) => {
                expect(res.body.user.name).toEqual("Anakin Skywalker")
            });
    })
});



/////////////////////////////////
// BAD REQUESTS
describe("Bad request GET /api/users?sort=banana", () => {
    test("400: invalid sort query", () => {
        return request(app)
            .get('/api/users?sort=banana')
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid sort query")
            })
    })
})

describe("Bad request: GET /api/users/:userId", () => {
    test("400: invalid user ID", () => {
        return request(app)
            .get(`/api/users/yoda`)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid user ID")
            })
    })
})