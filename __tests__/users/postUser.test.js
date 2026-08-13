import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("POST /api/users", () => {
    const user = {
        _id: new ObjectId(),
        username: "newuser",
        name: "New User",
        email: "newuser@example.com",
        passwordHash: "12345",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    test("200: posts a new user", () => {
        return request(app)
            .post(`/api/users`)
            .send(user)
            .expect(201)
            .then((res) => {
                expect(res.body.user.name).toEqual("New User")
            })
    })
});

///////////////////////////////////////
describe("POST /api/users/:userId", () => {
    test("405: does nothing", () => {
        return request(app)
            .post(`/api/users/6a75eae8292c72785545b039`)
            .expect(405)
    })
});

// also creates a user preferences and user history document

// bad requests
// posting item without required fields: _id, author, createdAt, updatedAt