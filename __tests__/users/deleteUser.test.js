import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("DELETE /api/users", () => {
    test("405: does nothing", async () => {
        return request(app)
            .delete(`/api/users`)
            .expect(405)
    })
});

///////////////////////////////////////
describe("DELETE /api/users/:userId", () => {
    test("200: deletes a user by their id", () => {
        return request(app)
            .delete(`/api/users/6a75eae8292c72785545b039`)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("User deleted successfully!");
            });
    })
});


///////////////////////////////////////
// BAD REQUESTS
describe("Bad request: DELETE /api/users/:userId", () => {
    test("405: when deleting from the users endpoint", () => {
        return request(app)
            .delete('/api/users')
            .expect(405)
    });

    test("400: when deleting an invalid id", () => {
        return request(app)
            .delete('/api/users/yoda')
            .expect(400)
    });

    test("404: when deleting a user that doesn't exist", () => {
        return request(app)
            .delete('/api/users/1a75eae8292c72785545b039')
            .expect(404)
    });
})