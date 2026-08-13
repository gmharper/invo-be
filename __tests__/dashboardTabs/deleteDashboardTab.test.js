import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

///////////////////////////////////////
describe("DELETE /api/dashboardTabs/:id", () => {
    test("200: deletes an inventory by its id", () => {
        return request(app)
            .delete(`/api/dashboardTabs/6a7de95ba1251aebb264484c`)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("Dashboard tab deleted successfully!");
            });
    })
});