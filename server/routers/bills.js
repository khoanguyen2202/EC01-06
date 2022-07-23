import express from "express"
import { createBill,updateBill,billDetail,deleteBill } from "../controllers/bills.js";

const router = express.Router();
router.post('/payment',createBill);
router.post('/admin/update-bill',updateBill)
router.get('/admin/bill-detail',billDetail)
router.delete('/admin/update-bill',deleteBill)
export default router;