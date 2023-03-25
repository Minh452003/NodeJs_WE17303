import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/products";
import routerUser from "./routes/users";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/api", routerUser);
mongoose.connect("mongodb://127.0.0.1:27017/onluyen1");

export const viteNodeApp = app;