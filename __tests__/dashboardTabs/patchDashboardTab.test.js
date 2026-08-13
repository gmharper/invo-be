import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';
import { ObjectId } from 'mongodb';

/////////////////////////////////////////
describe("PATCH /api/dashboardTabs", () => {
    const patch = {
        name: "Patched dashboard tab"
    };

    test("405: does nothing", () => {
        return request(app)
            .patch(`/api/dashboardTabs`)
            .send(patch)
            .expect(405)
    })
});

///////////////////////////////////////
describe("PATCH /api/dashboardTab/:id", () => {
    const patch = {
        name: 'Patched dashboard tab'
    };

    test("200: patches a dashboard tab by its id", () => {
        return request(app)
            .patch(`/api/dashboardTabs/6a7de95ba1251aebb264484c`)
            .send(patch)
            .expect(200)
            .then((response) => {
                expect(response.body.dashboardTab.name).toEqual("Patched dashboard tab");
            });
    })
});


/////////////////////////////////////////
// BAD REQUESTS
describe("Bad request PATCH /api/dashboardTabs/:id", () => {
    const patch = {
        name: "Patched dashboard tab"
    };

    test("400: invalid id", () => {
        return request(app)
            .patch('/api/dashboardTabs/mydashboard')
            .send(patch)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid dashboardTab ID")
            })
    });

    const bad_patch1 = {
        _id: new ObjectId(),
        name: 'Patched dashboard tab',
        author: new ObjectId()
    };

    test("200: cannot patch certain fields", () => {
        return request(app)
            .patch('/api/dashboardTabs/6a7de95ba1251aebb264484c')
            .send(bad_patch1)
            .expect(200)
            .then((res) => {
                expect(res.body.dashboardTab._id).toEqual("6a7de95ba1251aebb264484c") // dashboardTab 1
                expect(res.body.dashboardTab.name).toEqual("Patched dashboard tab")
                expect(res.body.dashboardTab.author).toEqual("6a75f003ada1ee425aa74af9") // gmharper
            })
    });
});