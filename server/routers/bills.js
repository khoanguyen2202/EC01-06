import express from "express"
import { createBill,updateBill,findAllBill,deleteBill,findSuccessBill } from "../controllers/bills.js";

const router = express.Router();
router.post('/create',createBill);
router.post('/update',updateBill);
router.get('/',findAllBill);
//router.get('/customer/success/:id',findSuccessBill);
// router.get('Success',findSuccessBill);
// router.get('Delivery',findDeliveryBill);
// router.get('Processing',findProcessingBill);
// router.get('Cancelled',findCancelledBill);
router.delete('/delete/:id',deleteBill);

export default router;
