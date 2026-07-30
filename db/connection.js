import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

const __dirname = path.resolve();
const ENV = "production";

dotenv.config({ 
  path: path.join(__dirname, `.env.${ENV}`)
});

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
  // CONNECT MONGOOSE
  await mongoose.connect(process.env.MONGODB_URI);
  
  return db;
};

export default connectDB;