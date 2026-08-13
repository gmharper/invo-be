import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("POST /api/workflows", () => {
    const workflow = {
        _id: new ObjectId(),
        name: "New Workflow",
        author: new ObjectId(),
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    test("201: posts a new workflow", () => {
        return request(app)
            .post(`/api/workflows`)
            .send(workflow)
            .expect(201)
            .then((res) => {
                expect(res.body.workflow.name).toEqual("New Workflow")
            })
    })
});

///////////////////////////////////////
describe("POST /api/workflows/:workflowId", () => {
    test("405: does nothing", () => {
        return request(app)
            .post(`/api/workflows/6a75f751f94ae4c1e49ca9b7`)
            .expect(405)
    })
});


// bad requests
// posting item without required fields: _id, author, createdAt, updatedAt