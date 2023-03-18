import express from "express";
import router from "./routes/products";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);


mongoose.connect("mongodb://127.0.0.1:27017/we17303");

export const viteNodeApp = app;
