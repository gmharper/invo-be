import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("GET /api/items", () => {
    test("200: returns the items", () => {
        return request(app)
            .get(`/api/items`)
            .expect(200)
            .then((res) => {
                const items = res.body.items;

                expect(res.body.items.length).toEqual(50);

                items.forEach((item) => {
                    expect(item).toEqual(
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
describe("GET /api/items", () => {
    test("200: Returns only a number of items defined by limit query", () => {
        return request(app)
            .get('/api/items?limit=16')
            .expect(200)
            .then((res) => {
                expect(res.body.items.length).toEqual(16)
            })
    })
});

//////////////////////////////////////
// gmharper
describe("GET /api/items?author=6a75f003ada1ee425aa74af9", () => {
    test("200: Returns items by author", () => {
        return request(app)
            .get('/api/items?author=6a75f003ada1ee425aa74af9')
            .expect(200)
            .then((res) => {
                expect(res.body.items.length).toEqual(108)
            })
    })
})


///////////////////////////////////////
describe("GET /api/items/:itemId", () => {
    test("200: returns an item by its id", () => {
        return request(app)
            .get(`/api/items/6a75f0845a9a13e26ba49314`)
            .expect(200)
            .then((res) => {
                expect(res.body.item.name).toEqual("Test Item 1")
            });
    })
});


/////////////////////////////////
// BAD REQUESTS
describe("Bad request GET /api/items?sort=banana", () => {
    test("400: invalid sort query", () => {
        return request(app)
            .get('/api/items?sort=banana')
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid sort query")
            })
    })
})

describe("GET /api/items/:itemId", () => {
    test("400: invalid item ID", () => {
        return request(app)
            .get(`/api/items/myitem`)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid item ID")
            })
    });

    test("404: item Id that does not exist", () => {
        return request(app)
            .get('/api/items/1a75fc21d8295be39ee90433')
            .expect(404)
    });
});