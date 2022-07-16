import { ProductModel } from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
    try {
        //query in DB
       

        const products = await ProductModel.find();
        console.log("products",products);
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const createProduct = (req,res) => {
    try {
        //create product
         const product = new ProductModel({
            type: "Mobile Case",
            brandName: "XunDD",
            productName: "XunDD Protect 1 Iphone 13",
            sku:"XD01",
        })

        product.save();
    } catch (error) {
        res.status(500).json({error:error});
    }
}