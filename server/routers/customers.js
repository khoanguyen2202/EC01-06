import express from "express";
// import { getCustomer,createCustomer,signIn,singOut,updateInfor,refreshToken} from "../controllers/customers.js";
// const customerCtrl = require("../controllers/customers.js")
import customerCtrl from "../controllers/customers.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// router.get("/list",customerCtrl.getCustomer);
router.post("/sign-up", customerCtrl.createCustomer);
router.post("/sign-in", customerCtrl.signIn);
router.get("/sign-out", customerCtrl.singOut);
router.get("/refresh_token", customerCtrl.refreshToken);
router.post("/:id/update", customerCtrl.updateInfor);

router.get("/infor", auth, customerCtrl.getCustomer);

router.delete("/customer", customerCtrl.deleteUser);
export default router;
