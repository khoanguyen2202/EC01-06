import express from "express";
import {
  createWarehouse,
  deleteWarehouse,
  inputProduct,
  findWarehouse,
  updateWarehouse,
} from "../controllers/warehouses.js";

const router = express.Router();
router.post("/create", createWarehouse);
router.delete("/delete", deleteWarehouse);
router.get("/", findWarehouse);
router.put("/add", inputProduct);
router.put("/update", updateWarehouse);
export default router;
