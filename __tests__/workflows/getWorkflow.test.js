import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("GET /api/workflows", () => {
    test("200: returns the workflows", () => {
        return request(app)
            .get(`/api/workflows`)
            .expect(200)
            .then((res) => {
                const workflows = res.body.workflows;

                workflows.forEach((workflow) => {
                    expect(workflow).toEqual(
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
describe("Get /api/workflows", () => {
    test("200: returns only a number of workflows defined by limit query", () => {
        return request(app)
            .get('/api/workflows?limit=4')
            .expect(200)
            .then((res) => {
                expect(res.body.workflows.length).toEqual(4)
            })
    })
});


///////////////////////////////////////
describe("GET /api/workflows/:workflowId", () => {
    test("200: returns a workflow by its id", () => {
        return request(app)
            .get(`/api/workflows/6a75f751f94ae4c1e49ca9b7`)
            .expect(200)
            .then((res) => {
                expect(res.body.workflow.name).toEqual("Test Workflow 5")
            });
    })
});


/////////////////////////////////
// BAD REQUESTS
describe("Bad request GET /api/workflows?sort=banana", () => {
    test("400: invalid sort query", () => {
        return request(app)
            .get('/api/workflows?sort=banana')
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid sort query")
            })
    })
})

describe("GET /api/workflows/:workflowId", () => {
    test("400: invalid workflow ID", () => {
        return request(app)
            .get(`/api/workflows/myworkflow`)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid workflow ID")
            })
    })
});