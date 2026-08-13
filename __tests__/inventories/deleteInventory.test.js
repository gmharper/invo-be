import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("DELETE /api/inventories", () => {
    test("405: does nothing", async () => {
        return request(app)
            .delete(`/api/inventories`)
            .expect(405)
    })
});

///////////////////////////////////////
describe("DELETE /api/inventories/:inventoryId", () => {
    test("200: deletes an inventory by its id", () => {
        return request(app)
            .delete(`/api/inventories/6a7511150930fd3868490ca0`)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("Inventory deleted successfully!");
            });
    })
});