import express from "express";
import { getAll, get, create, remove, update } from "../controller/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", checkPermission, create);
router.delete("/products/:id", checkPermission, remove);
router.patch("/products/:id", checkPermission, update);

export default router;