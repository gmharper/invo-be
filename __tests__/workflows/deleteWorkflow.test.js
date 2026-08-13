import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("DELETE /api/workflows", () => {
    test("405: does nothing", async () => {
        return request(app)
            .delete(`/api/workflows`)
            .expect(405)
    })
});

///////////////////////////////////////
describe("DELETE /api/workflows/:workflowId", () => {
    test("200: deletes a workflow by its id", () => {
        return request(app)
            .delete(`/api/workflows/6a75f751f94ae4c1e49ca9b7`)
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toEqual("Workflow deleted successfully!");
            });
    })
});