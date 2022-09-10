import ctrlPayment from "../controllers/payment.js"
import express from "express"

const router = express.Router()
router.post("/get",ctrlPayment.getProducts)

export default router