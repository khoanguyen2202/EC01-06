import express from "express";
import { getCustomer,createCustomer,signIn,singOut,updateInfor,refreshToken} from "../controllers/customers.js";

const router = express.Router();
router.get("/customers",getCustomer);
router.post("/sign-up",createCustomer);
router.post("/sign-in",signIn);
router.get("/sign-out",singOut);
router.get("/refresh_token",refreshToken);
router.post("/customers/:id/update",updateInfor);
// router.delete("/customer",deleteUser);
export default router;