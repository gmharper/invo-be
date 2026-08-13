import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("DELETE /api/machines", () => {
    test("405: does nothing", async () => {
        return request(app)
            .delete(`/api/machines`)
            .expect(405)
    })
});

///////////////////////////////////////
describe("DELETE /api/machines/:machineId", () => {
    test("200: deletes a machine by its id", () => {
        return request(app)
            .delete(`/api/machines/6a75fc21d8295be39ee90433`)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("Machine deleted successfully!");
            });
    })
});