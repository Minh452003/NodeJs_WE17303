import express from "express";
import { signUp, signIn } from "../controller/auth";

const routerUser = express.Router();

routerUser.post("/signup", signUp);
routerUser.post("/signin", signIn);

export default routerUser