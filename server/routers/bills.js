import express from "express";
import {
  createBill,
  updateBill,
  findAllBill,
  deleteBill,
  findBillsByCusId,
} from "../controllers/bills.js";

const router = express.Router();
router.post("/create", createBill);
router.post("/update", updateBill);
router.get("/", findAllBill);
router.delete("/delete/:id", deleteBill);
router.post("/phonenumber", findBillsByCusId);
export default router;
