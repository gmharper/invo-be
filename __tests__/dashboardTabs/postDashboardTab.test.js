import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';
import { ObjectId } from 'mongodb';

/////////////////////////////////////////
describe("POST /api/dashboardTabs", () => {
    const dashboardTab = {
        _id: new ObjectId(),
        name: "New Dashboard Tab",
        description: "",
        panels: [],
        author: new ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    test("200: posts a new dashboard tab", () => {
        return request(app)
            .post(`/api/dashboardTabs`)
            .send(dashboardTab)
            .expect(201)
            .then((res) => {
                expect(res.body.dashboardTab.name).toEqual("New Dashboard Tab")
            })
    });
});

///////////////////////////////////////
describe("POST /api/dashboardTabs/:id", () => {
    test("405: does nothing", () => {
        return request(app)
            .post(`/api/dashboardTabs/6a7511150930fd3868490ca0`)
            .expect(405)
    })
});