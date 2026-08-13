import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

describe("GET /api/history/6a7d21d34bbcae225dd3f69a", () => {
    test("200: Get history by id", () => {
        return request(app)
            .get('/api/history/6a7d21d34bbcae225dd3f69a')
            .expect(200)
            .then((res) => {
                expect(res.body.history.type).toEqual('inventory')
                expect(res.body.history.entries.length).toEqual(11)
            })
    })
});

// describe("GET /api/history?refId=6a7511150930fd3868490c99", () => {
//     test("200: Get history by refId (by item)", () => {
//         return request(app)
//             .get('/api/history?refId=6a7511150930fd3868490c99')
//             .expect(200)
//             .then((res) => {
//                 console.log(res.body)
//             })
//     })
// });


// BAD REQUESTS
describe("GET bad requests", () => {
    test("400: Invalid history Id", () => {
        return request(app)
            .get('/api/history/inventory1_history')
            .expect(400)
    });

    test("404: history Id that does not exist", () => {
        return request(app)
            .get('/api/history/1a7d21d34bbcae225dd3f69a')
            .expect(404)
    });
});