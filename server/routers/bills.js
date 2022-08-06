import express from "express"
import { createBill,updateBill,findBill,deleteBill } from "../controllers/bills.js";

const router = express.Router();
router.post('/create',createBill);
router.post('/update',updateBill);
router.get('/find',findBill);
router.delete('/delete/:id',deleteBill);

export default router;
