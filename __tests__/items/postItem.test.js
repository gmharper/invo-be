import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("POST /api/items", () => {
    const item = {
        _id: new ObjectId(),
        name: "New Item",
        author: new ObjectId(),
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    test("200: posts a new item", () => {
        return request(app)
            .post(`/api/items`)
            .send(item)
            .expect(201)
            .then((res) => {
                expect(res.body.item.name).toEqual("New Item")
            })
    })
});

///////////////////////////////////////
describe("POST /api/items/:itemId", () => {
    test("405: does nothing", () => {
        return request(app)
            .post(`/api/items/6a75f0845a9a13e26ba4931b`)
            .expect(405)
    })
});


// bad requests
// posting item without required fields: _id, author, createdAt, updatedAt