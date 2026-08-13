import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("POST /api/inventories", () => {
    const inventory = {
        _id: new ObjectId(),
        name: "New Inventory",
        author: new ObjectId(),
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    test("200: posts a new inventory", () => {
        return request(app)
            .post(`/api/inventories`)
            .send(inventory)
            .expect(201)
            .then((res) => {
                expect(res.body.inventory.name).toEqual("New Inventory")
            })
    })
});

///////////////////////////////////////
describe("POST /api/inventories/:inventoryId", () => {
    test("405: does nothing", () => {
        return request(app)
            .post(`/api/inventories/6a7511150930fd3868490ca0`)
            .expect(405)
    })
});