import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("PATCH /api/items", () => {
    const patch = {
        name: "Patched item"
    };

    test("405: does nothing", () => {
        return request(app)
            .patch(`/api/items`)
            .send(patch)
            .expect(405)
    })
});

///////////////////////////////////////
describe("PATCH /api/items/:itemId", () => {
    const patch = {
        name: 'Patched item'
    };

    test("200: patches an item by its id", () => {
        return request(app)
            .patch(`/api/items/6a75f0845a9a13e26ba4931b`)
            .send(patch)
            .expect(200)
            .then((res) => {
                expect(res.body.item.name).toEqual("Patched item");
            });
    })
});


/////////////////////////////////////////
// BAD REQUESTS
describe("Bad request PATCH /api/items/:itemId", () => {
    const patch = {
        name: "Patched item"
    };

    test("400: invalid itemId", () => {
        return request(app)
            .patch('/api/items/myitem')
            .send(patch)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid item ID")
            })
    });

    const bad_patch1 = {
        _id: new ObjectId(),
        name: 'Patched item',
        author: new ObjectId()
    };

    test("200: cannot patch certain fields", () => {
        return request(app)
            .patch('/api/items/6a75f0845a9a13e26ba49314')
            .send(bad_patch1)
            .expect(200)
            .then((res) => {
                expect(res.body.item._id).toEqual("6a75f0845a9a13e26ba49314") // unchanged
                expect(res.body.item.name).toEqual("Patched item")
                expect(res.body.item.author).toEqual("6a75f003ada1ee425aa74af9") // unchanged
            })
    });
});
// can't update certain fields (_id, author, createdAt)