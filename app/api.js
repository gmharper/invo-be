import express from "express";
const app = express();
import cors from 'cors';

import apiRouter from "./routers/apiRouter.js";
import connectDB from "../db/connection.js";

app.use(express.json({ strict:false }))
app.use(cors());
app.use("/api", apiRouter);

app.use("/*splat", (req, res) => {
  res.status(404).send({ msg: "404: Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "400: Bad Request" });
  } else if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ 
    msg: "Internal server error",
    error: err
  });
});

const db = connectDB();

export { app, db };
