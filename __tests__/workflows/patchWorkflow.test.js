import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("PATCH /api/workflows", () => {
    const patch = {
        name: "Patched workflow"
    };

    test("405: does nothing", () => {
        return request(app)
            .patch(`/api/workflows`)
            .send(patch)
            .expect(405)
    })
});

///////////////////////////////////////
describe("PATCH /api/workflows/:workflowId", () => {
    const patch = {
        name: "Patched workflow"
    };

    test("200: patches a workflow by its id", () => {
        return request(app)
            .patch(`/api/workflows/6a75f751f94ae4c1e49ca9b7`)
            .send(patch)
            .expect(200)
            .then((res) => {
                expect(res.body.workflow.name).toEqual("Patched workflow")
            });
    })
});


////////////////////////////////////////
// BAD REQUESTS
describe("Bad request PATCH /api/workflows/:workflowId", () => {
    const patch = {
        name: "Patched workflow"
    };

    test("400: invalid workflowId", () => {
        return request(app)
            .patch('/api/workflows/myworkflow')
            .send(patch)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid workflow ID")
            })
    });

    const bad_patch1 = {
        _id: new ObjectId(),
        name: 'Patched workflow',
        author: new ObjectId()
    };

    test("200: cannot patch certain fields", () => {
        return request(app)
            .patch('/api/workflows/6a75f751f94ae4c1e49ca9ba')
            .send(bad_patch1)
            .expect(200)
            .then((res) => {
                expect(res.body.workflow._id).toEqual("6a75f751f94ae4c1e49ca9ba")
                expect(res.body.workflow.name).toEqual("Patched workflow")
                expect(res.body.workflow.author).toEqual("6a75f003ada1ee425aa74af9") // gmharper
            })
    });
})
// can't update certain fields (_id, author, createdAt)