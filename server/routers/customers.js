import express from "express";
// import { getCustomer,createCustomer,signIn,singOut,updateInfor,refreshToken} from "../controllers/customers.js";
// const customerCtrl = require("../controllers/customers.js")
import customerCtrl from "../controllers/customers.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/sign-up", customerCtrl.createCustomer);
router.post("/sign-in", customerCtrl.signIn);
router.get("/sign-out", customerCtrl.singOut);
router.get("/refresh_token", customerCtrl.refreshToken);
router.post("/:id/update", customerCtrl.updateInfor);
router.get("/info/:_id", customerCtrl.getInfo);
router.delete("/customer", customerCtrl.deleteUser);
router.get("/get-cart",customerCtrl.getCustomerCart);
router.post("/create-cart",customerCtrl.createCustomerCart);
router.delete("/delete-cart",customerCtrl.deleteCustomerCart);
router.get('/', customerCtrl.getCustomers);
export default router;
