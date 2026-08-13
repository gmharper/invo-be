import { jest, describe, test, expect } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { ObjectId } from "mongodb";

import { app } from '../../app/api.js';

/////////////////////////////////////////
describe("PATCH /api/machines", () => {
    const patch = {
        name: "Patched machine"
    };

    test("405: does nothing", () => {
        return request(app)
            .patch(`/api/machines`)
            .send(patch)
            .expect(405)
    })
});

///////////////////////////////////////
describe("PATCH /api/machines/:machineId", () => {
    const patch = {
        name: 'Patched machine'
    };

    test("200: patches a machine by its id", () => {
        return request(app)
            .patch(`/api/machines/6a75fc21d8295be39ee90433`)
            .send(patch)
            .expect(200)
            .then((res) => {
                expect(res.body.machine.name).toEqual('Patched machine')
            });
    })
});


//////////////////////////////////////////////
// BAD REQUESTS
describe("Bad request PATCH /api/machines/:machineId", () => {
    const patch = {
        name: "Patched machine"
    };

    test("400: invalid machineId", () => {
        return request(app)
            .patch('/api/machines/mymachine')
            .send(patch)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid machine ID")
            })
    });

    const bad_patch1 = {
        _id: new ObjectId(),
        name: 'Patched machine',
        author: new ObjectId()
    };

    test("200: cannot patch certain fields", () => {
        return request(app)
            .patch('/api/machines/6a75fc21d8295be39ee90438')
            .send(bad_patch1)
            .expect(200)
            .then((res) => {
                expect(res.body.machine._id).toEqual("6a75fc21d8295be39ee90438")
                expect(res.body.machine.name).toEqual("Patched machine")
                expect(res.body.machine.author).toEqual("6a75f003ada1ee425aa74af9") // gmharper
            })
    });
})
// can't update certain fields (_id, author, createdAt)