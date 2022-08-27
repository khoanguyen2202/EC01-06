import ctrlBanner from "../controllers/banners.js";
import express from "express"

const router = express.Router()
router.post("/create",ctrlBanner.createBanner)
router.delete("/delete",ctrlBanner.deleteBanner)
router.put("/update",ctrlBanner.updateBanner)
router.get("/",ctrlBanner.getAllBanner)
router.get("/:_id",ctrlBanner.getOneBanner)
export default router;