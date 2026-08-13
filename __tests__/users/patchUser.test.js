import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("PATCH /api/users", () => {
    const patch = {
        name: "Patched user"
    };

    test("405: does nothing", () => {
        return request(app)
            .patch(`/api/users`)
            .send(patch)
            .expect(405)
    })
});

///////////////////////////////////////
describe("PATCH /api/users/:userId", () => {
    const patch = {
        name: 'Patched user'
    };

    test("200: patches a user by their id", () => {
        return request(app)
            .patch(`/api/users/6a75eae8292c72785545b039`)
            .send(patch)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("User patched successfully!")
            });
    })
});


////////////////////////////////////////
// BAD REQUESTS
describe("Bad request PATCH /api/users/:userId", () => {
    const patch = {
        name: 'Patched user'
    };

    test("400: invalid userId", () => {
        return request(app)
            .patch(`/api/users/yoda`)
            .send(patch)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid user ID")
            })
    });

    const bad_patch1 = {
        _id: new ObjectId(),
        name: 'Patched user',
    };

    test("200: cannot patch certain fields", () => {
        return request(app)
            .patch('/api/users/6a75eae8292c72785545b035')
            .send(bad_patch1)
            .expect(200)
            .then((res) => {
                expect(res.body.user._id).toEqual("6a75eae8292c72785545b035")
                expect(res.body.user.name).toEqual("Patched user")
            })
    });
})
// can't update certain fields (_id, author, createdAt)