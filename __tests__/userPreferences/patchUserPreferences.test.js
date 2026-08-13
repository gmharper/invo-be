import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';
import { ObjectId } from 'mongodb';

/////////////////////////////////////////
describe("PATCH /api/preferences", () => {
    const patch = {
        keepLoggedIn: false
    };

    test("404: does nothing", () => {
        return request(app)
            .patch(`/api/preferences`)
            .send(patch)
            .expect(404)
    })
});

///////////////////////////////////////
describe("PATCH /api/preferences/:id", () => {
    const patch = {
        keepLoggedIn: false
    };

    test("200: patches a user's preferences by id", () => {
        return request(app)
            .patch(`/api/preferences/6a7de2fa748fef5224525d18`)
            .send(patch)
            .expect(200)
            .then((res) => {
                expect(res.body.preferences.keepLoggedIn).toEqual(false)
            });
    })
});


//////////////////////////////////////////////
// BAD REQUESTS
describe("PATCH Bad requests", () => {
    const patch = {
        keepLoggedIn: false
    };

    test("400: invalid id", () => {
        return request(app)
            .patch('/api/preferences/mypreferences')
            .send(patch)
            .expect(400)
            .then((res) => {
                expect(res.body.error).toEqual("Invalid preferences ID")
            })
    });

    test("404: when passed an id that does not exist", () => {
        return request(app)
            .patch('/api/preferences/1a7de2fa748fef5224525d18')
            .send(patch)
            .expect(404)
    })

    const bad_patch1 = {
        _id: new ObjectId(),
        refId: new ObjectId(),
        keepLoggedIn: false,
        sendEmailNotifications: false,
        showPhone: false,
        showEmail: false
    };

    test("200: cannot patch certain fields", () => {
        return request(app)
            .patch('/api/preferences/6a7de2fa748fef5224525d18')
            .send(bad_patch1)
            .expect(200)
            .then((res) => {
                expect(res.body.preferences._id).toEqual("6a7de2fa748fef5224525d18")
                expect(res.body.preferences.refId).toEqual("6a75f003ada1ee425aa74af9") //gmharper
                expect(res.body.preferences.keepLoggedIn).toEqual(false)
                expect(res.body.preferences.sendEmailNotifications).toEqual(false)
                expect(res.body.preferences.showPhone).toEqual(false)
                expect(res.body.preferences.showEmail).toEqual(false)
            })
    });
})
// can't update certain fields (_id, author, createdAt)