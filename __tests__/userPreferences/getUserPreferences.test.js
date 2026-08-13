import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';

describe("GET /api/preferences/6a7de2fa748fef5224525d18", () => {
    test("200: Get preferences by id", () => {
        return request(app)
            .get('/api/preferences/6a7de2fa748fef5224525d18')
            .expect(200)
            .then((res) => {
                const preferences = res.body.preferences;

                expect(preferences).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        theme: expect.any(String),
                        keepLoggedIn: expect.any(Boolean),
                        sendEmailNotifications: expect.any(Boolean),
                        showPhone: expect.any(Boolean),
                        showEmail: expect.any(Boolean)
                    })
                );
            })
    })
});


// BAD REQUESTS
describe("GET bad requests", () => {
    test("400: Invalid id", () => {
        return request(app)
            .get('/api/preferences/yodas_preferences')
            .expect(400)
    });

    test("404: Id that does not exist", () => {
        return request(app)
            .get('/api/preferences/1a7de2fa748fef5224525d18')
            .expect(404)
    })
});