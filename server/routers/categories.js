import express from "express"
import categoryCtrl from "../controllers/categories.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/get",categoryCtrl.getCategories);
router.post("/post", categoryCtrl.createCategory);
router.delete("/delete/:id", categoryCtrl.deleteCategory);
router.put("/put/:id", categoryCtrl.updateCategory);
/*
router.get('/get',categoryCtrl.getCategories);
router.post('/post',auth, authAdmin, categoryCtrl.createCategory);
router.delete('/delete/:id',auth, authAdmin, categoryCtrl.deleteCategory);
router.put('/put/:id',auth, authAdmin, categoryCtrl.updateCategory);
*/

export default router;