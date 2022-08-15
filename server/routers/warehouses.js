import express from "express";
import {
  createWarehouse,
  deleteWarehouse,
  inputProduct,
  findWarehouse
} from "../controllers/warehouses.js";

const router = express.Router();
router.post("/create", createWarehouse);
router.delete("/delete", deleteWarehouse);
router.get("/",findWarehouse);
router.put("/add",inputProduct)
export default router;
