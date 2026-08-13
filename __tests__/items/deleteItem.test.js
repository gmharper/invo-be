import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("DELETE /api/items", () => {
    test("405: does nothing", async () => {
        return request(app)
            .delete(`/api/items`)
            .expect(405)
    })
});

///////////////////////////////////////
describe("DELETE /api/item/:itemId", () => {
    test("200: deletes an item by its id", () => {
        return request(app)
            .delete(`/api/items/6a75f0845a9a13e26ba4931b`)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("Item deleted successfully!");
            });
    })
});