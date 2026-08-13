import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("POST /api/machines", () => {
    const machine = {
        _id: new ObjectId(),
        name: "New Machine",
        author: new ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    test("201: posts a new machine", () => {
        return request(app)
            .post(`/api/machines`)
            .send(machine)
            .expect(201)
            .then((res) => {
                expect(res.body.machine.name).toEqual("New Machine")
            })
    })
});

///////////////////////////////////////
describe("POST /api/machines/:machineId", () => {
    test("405: does nothing", () => {
        return request(app)
            .post(`/api/machines/6a75fc21d8295be39ee90433`)
            .expect(405)
    })
});


// bad requests
// posting item without required fields: _id, author, createdAt, updatedAt