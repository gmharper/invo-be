import { beforeAll, beforeEach, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import connectDB from "../db/connection";
import { reseed } from "./reseed";

beforeAll(async () => {
    await connectDB();
});

beforeEach(async () => {
    await reseed();
});

afterAll(async () => {
  await mongoose.connection.close();
});