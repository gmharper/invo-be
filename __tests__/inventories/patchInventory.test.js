import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("PATCH /api/inventories", () => {
    const patch = {
        name: "Patched inventory"
    };

    test("405: does nothing", () => {
        return request(app)
            .patch(`/api/inventories`)
            .send(patch)
            .expect(405)
    })
});

///////////////////////////////////////
describe("PATCH /api/inventories/:inventoryId", () => {
    const patch = {
        name: 'Patched inventory'
    };

    test("200: patches an inventory by its id", () => {
        return request(app)
            .patch(`/api/inventories/6a7511150930fd3868490ca0`)
            .send(patch)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("Inventory patched successfully!");
            });
    })
});


/////////////////////////////////////////
// BAD REQUESTS
describe("Bad request PATCH /api/inventories/:inventoryId", () => {
    const patch = {
        name: "Patched inventory"
    };

    test("400: invalid inventoryId", () => {
        return request(app)
            .patch('/api/inventories/myinventory')
            .send(patch)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid inventory ID")
            })
    });

    const bad_patch1 = {
        _id: new ObjectId(),
        name: 'Patched inventory',
        author: new ObjectId()
    };

    test("200: cannot patch certain fields", () => {
        return request(app)
            .patch('/api/inventories/6a7511150930fd3868490c99')
            .send(bad_patch1)
            .expect(200)
            .then((res) => {
                expect(res.body.inventory._id).toEqual("6a7511150930fd3868490c99") // test inventory 1
                expect(res.body.inventory.name).toEqual("Patched inventory")
                expect(res.body.inventory.author).toEqual("6a75eae8292c72785545b036") // yoda
            })
    });
});