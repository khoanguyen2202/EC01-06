import express from "express"
import { createBill,updateBill,billDetail,deleteBill } from "../controllers/bills.js";

const router = express.Router();
router.post('/payment',createBill);
router.post('/update-bill',updateBill)
router.get('/bill-detail',billDetail)
router.delete('/update-bill',deleteBill)
export default router;