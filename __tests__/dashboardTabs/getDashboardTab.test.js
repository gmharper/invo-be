import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

///////////////////////////////////////
describe("GET /api/dashboardTabs/:id", () => {
    test("200: returns a dashboardTab by its id", () => {
        return request(app)
            .get(`/api/dashboardTabs/6a7de95ba1251aebb264484c`)
            .expect(200)
            .then((res) => {
                expect(res.body.dashboardTab.name).toEqual("Dashboard Tab 1")
            });
    })
});

// BAD REQUESTS
describe("GET bad requests", () => {
    test("400: Invalid dashboardTab Id", () => {
        return request(app)
            .get('/api/dashboardTabs/tab1')
            .expect(400)
    });

    test("404: dashboardTab Id that does not exist", () => {
        return request(app)
            .get('/api/dashboardTabs/1a7d21d34bbcae225dd3f69a')
            .expect(404)
    });
});