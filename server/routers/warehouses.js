import express from "express";
import {
  createWarehouse,
  deleteWarehouse,
  listWarehouse,
  inputProduct
} from "../controllers/warehouses.js";

const router = express.Router();
router.post("/create", createWarehouse);
router.delete("/delete", deleteWarehouse);
router.get("/", listWarehouse);
router.put("/add",inputProduct)
export default router;
