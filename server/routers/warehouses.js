import express from "express";
import { createWarehouse,deleteWarehouse,listWarehouse } from "../controllers/warehouses.js";

const router = express.Router();
router.post("/create-warehouse",createWarehouse)
router.delete("/delete-warehouse",deleteWarehouse)
router.get("/warehouses",listWarehouse)
export default router;
