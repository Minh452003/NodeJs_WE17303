import express from "express";
import { signUp } from "../controller/auth";

const routerUser = express.Router();

routerUser.post("/signup", signUp);

export default routerUser