import express from "express";
import {getProducts, createProduct,updateProduct, deleteProduct} from "../controllers/products.js"
const router = express.Router();

router.get('/', getProducts) ;
router.post('/add', createProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);
export default router;