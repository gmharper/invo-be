import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';
import { ObjectId } from 'mongodb';

/////////////////////////////////////////
describe("GET /api/inventories", () => {
    test("200: returns the inventories", () => {
        return request(app)
            .get(`/api/inventories`)
            .expect(200)
            .then((res) => {
                const inventories = res.body.inventories

                inventories.forEach((inventory) => {
                    expect(inventory).toEqual(
                        expect.objectContaining({
                            _id: expect.any(String),
                            name: expect.any(String),
                            author: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String)
                        })
                    );
                });
            })
    })
});

///////////////////////////////////////
describe("Get /api/inventories", () => {
    test("200: returns only a number of inventories defined by limit query", () => {
        return request(app)
            .get('/api/inventories?limit=2')
            .expect(200)
            .then((res) => {
                expect(res.body.inventories.length).toEqual(2)
            })
    })
});

describe("Get /api/inventories?limit=700", () => {
    test("200: number returned doesn't exceed the maximum limit", () => {
        return request(app)
            .get('/api/inventories?limit=700')
            .expect(200)
            .then((res) => {
                expect(res.body.inventories.length).toEqual(8)
            })
    })
});

describe("Get /api/inventories?limit=-1", () => {
    test("400: When limit query is invalid", () => {
        return request(app)
            .get('/api/inventories?limit=-1')
            .expect(400)
    })
});


describe("GET /api/inventories?author=6a75eae8292c72785545b036", () => {
    test("200: Get inventories by author", () => {
        return request(app)
            .get('/api/inventories?author=6a75eae8292c72785545b036')
            .expect(200)
            .then((res) => {
                expect(res.body.inventories.length).toEqual(2)
            })
    })
})

///////////////////////////////////////
describe("GET /api/inventories/:inventoryId", () => {
    test("200: returns the inventory", () => {
        return request(app)
            .get(`/api/inventories/6a7511150930fd3868490ca0`)
            .expect(200)
            .then((res) => {
                expect(res.body.inventory.name).toEqual("Test Inventory 8")
            });
    })
});


/////////////////////////////////
// BAD REQUESTS
describe("Bad request GET /api/inventories?sort=banana", () => {
    test("400: invalid sort query", () => {
        return request(app)
            .get('/api/inventories?sort=banana')
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid sort query")
            })
    })
});

describe("Bad request GET /api/inventories/:inventoryId", () => {
    test("400: invalid inventory ID", () => {
        return request(app)
            .get(`/api/inventories/myinventory`)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid inventory ID")
            })
    });

    test("404: inventory Id that does not exist", () => {
        return request(app)
            .get('/api/inventories/1a75fc21d8295be39ee90433')
            .expect(404)
    });
});