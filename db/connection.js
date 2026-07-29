import { MongoClient } from "mongodb";
import path from "path";
import dotenv from "dotenv";

const ENV = "production";

dotenv.config({ 
  path: path.join(__dirname, `../../.env.${ENV}`) 
});

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI not set");
}

const mongoConfig = {
  maxPoolSize: 2, // same idea as pgConfig.max
};

const client = new MongoClient(process.env.MONGODB_URI, mongoConfig);

let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(); // uses DB name from the URI
  }
  return db;
}

export default connectDB;