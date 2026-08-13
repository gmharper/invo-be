import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import "jest-sorted";
import axios from "axios";
import request from "supertest";

import { app } from '../../app/api.js';
import { ObjectId } from 'bson';

describe("PATCH /api/history/6a7d21d34bbcae225dd3f69a", () => {
    test("200: trim history entries by id", () => {
        return request(app)
            .patch('/api/history/6a7d21d34bbcae225dd3f69a')
            .set("Content-Type", "application/json")
            .send(5)
            .expect(200)
            .then((res) => {
                expect(res.body.history.entries.length).toEqual(6);
            })
    });

    test("200: trim history entries by count longer than length", () => {
        return request(app)
            .patch('/api/history/6a7d21d34bbcae225dd3f69a')
            .set("Content-Type", "application/json")
            .send(50)
            .expect(200)
            .then((res) => {
                expect(res.body.history.entries.length).toEqual(0);
            })
    })

    test("200: append to end of history entries by id", () => {
        return request(app)
            .patch('/api/history/6a7d21d34bbcae225dd3f69a')
            .send({
                type: 'inventory',
                action: "TEST",
                author: new ObjectId(),
                timestamp: new Date()
            })
            .expect(200)
            .then((res) => {
                const entries = res.body.history.entries;

                expect(entries.length).toEqual(12)
                expect(entries[entries.length -1].action).toEqual("TEST")
            })
    })
});


// BAD REQUESTS

describe("bad requests", () => {
    test("404: invalid ID", () => {
        return request(app)
            .patch('/api/history/banana')
            .send({
                _id: new ObjectId(),
                refId: new ObjectId(),
                type: 'inventory',
                action: "TEST",
                author: new ObjectId(),
                timestamp: new Date()
            })
            .expect(400)
    });

    test("400: invalid send", () => {
        return request(app)
            .patch('/api/history/6a7d21d34bbcae225dd3f69a')
            .send({
                _id: "new id",
                refId: "new Id",
                type: 'inventory',
                action: "TEST",
                author: new ObjectId(),
                timestamp: "tuesday"
            })
            .expect(400)
    });

    test("400: invalid count", () => {
        return request(app)
            .patch('/api/history/6a7d21d34bbcae225dd3f69a')
            .send("-1")
            .expect(400)
    });
});