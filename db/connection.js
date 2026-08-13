import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

const __dirname = path.resolve();
const ENV = "test";

dotenv.config({ 
  path: path.join(process.cwd(), `.env.${ENV}`)
});

const mongoConfig = {
  maxPoolSize: 2, // same idea as pgConfig.max
};

const client = new MongoClient(process.env.MONGODB_URI, mongoConfig);
//mongoose.set("debug", true);

let db;

export async function connectDB() {
  if (!db) {
    await client.connect();

    db = client.db(); // uses DB name from the URI
  }
  // CONNECT MONGOOSE
  await mongoose.connect(process.env.MONGODB_URI);
  
  return db;
};

export default connectDB;