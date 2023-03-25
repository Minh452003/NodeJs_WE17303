import express from "express";
import { getAll, get, create, remove, update } from "../controller/product";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", create);
router.delete("/products/:id", remove);
router.patch("/products/:id", update);

export default router;