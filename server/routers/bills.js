import express from "express"
import { createBill,updateBill,findBill,deleteBill } from "../controllers/bills.js";

const router = express.Router();
router.post('/payment',createBill);
router.post('/update-bill',updateBill);
router.get('/find-bill',findBill);
router.delete('/delete-bill',deleteBill);
export default router;