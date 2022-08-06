import mongoose from "mongoose";
import { WarehouseModel } from "../models/WarehouseModel.js";

export const createWarehouse = async (req, res) => {
  try {
    const { warehouse_id, hotline, address } = req.body;
    const newWarehouse = new WarehouseModel({
      warehouse_id,
      hotline,
      address,
    });
    await newWarehouse.save();
    res.json(newWarehouse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteWarehouse = async (req, res) => {
  try {
    const { _id } = req.body;
    await WarehouseModel.findByIdAndDelete({ _id });
    res.json({ msg: "Deleted warehouse" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const listWarehouse = async (req, res) => {
  try {
    const warehouses = await WarehouseModel.find();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const inputProduct = async (req, res) => {
  try {
    const { warehouse_id, products } = req.body;
    // console.log(products);
    const warehouse = await WarehouseModel.findOne({ warehouse_id });
    if (!warehouse)
      return res.status(400).json({ msg: "Warehouse ID not exists." });

    let addProduct = [];
    let addColor = [];

    for (let i = 0; i < products.length; ++i) {
      // let product = await WarehouseModel.find({ "products.product_id": {$eq:products[i].product_id},"warehouse_id":{$eq:warehouse_id}});
      let product = await WarehouseModel.find({
        "products.product_id": { $eq: products[i].product_id },
        warehouse_id: { $eq: warehouse_id },
      });
      if (product.length === 0) {
        addProduct.push(products[i]);
        await WarehouseModel.updateMany(
          { warehouse_id: warehouse_id },
          { $push: { products: addProduct } }
        );
        res.json({ msg: "Add a product." });
      } else {

        for (let k = 0; k < products[i].colors.length; ++k) {
          let color = await WarehouseModel.find({
            "products.product_id": { $eq: products[i].product_id },
            "warehouse_id": { $eq: warehouse_id },
            "products.colors.color": { $eq: products[i].colors[k].color },
          });
         
          
          if (color.length === 0) {
           
            addColor.push(products[i].colors[k]);
            // console.log(products[i].product_id);
            console.log(addColor);
            
            await WarehouseModel.updateMany(
              {
                warehouse_id: warehouse_id,
                products:products[i],
                product_id: products[i].product_id,
                colors:products[i].colors[k]
              },
              { $push: {colors: addColor  }}
            );
            res.json({ msg: "Add a color." });
          }
        }
      }
    }

    

    // await WarehouseModel.findOneAndUpdate({ warehouse_id }, {products: addProduct });

    
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
