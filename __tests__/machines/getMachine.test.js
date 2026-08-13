import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("GET /api/machines", () => {
    test("200: returns the machines", () => {
        return request(app)
            .get(`/api/machines`)
            .expect(200)
            .then((res) => {
                const machines = res.body.machines;

                machines.forEach((machine) => {
                    expect(machine).toEqual(
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
describe("GET /api/machines", () => {
    test("200: returns only a number of machines defined by limit query", () => {
        return request(app)
            .get('/api/machines?limit=4')
            .expect(200)
            .then((res) => {
                expect(res.body.machines.length).toEqual(4)
            })
    })
});

///////////////////////////////////////
describe("GET /api/machines/:machineId", () => {
    test("200: returns a machine by its id", () => {
        return request(app)
            .get(`/api/machines/6a75fc21d8295be39ee90433`)
            .expect(200)
            .then((res) => {
                expect(res.body.machine.name).toEqual("Test Machine 3")
            });
    })
});


/////////////////////////////////
// BAD REQUESTS
describe("Bad request GET /api/machines?sort=banana", () => {
    test("400: invalid sort query", () => {
        return request(app)
            .get('/api/machines?sort=banana')
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid sort query")
            })
    })
})

describe("GET /api/machines/:machineId", () => {
    test("400: invalid machine ID", () => {
        return request(app)
            .get(`/api/machines/mymachine`)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid machine ID")
            })
    });

    test("404: machine Id that does not exist", () => {
        return request(app)
            .get('/api/machines/1a75fc21d8295be39ee90433')
            .expect(404)
    });
});