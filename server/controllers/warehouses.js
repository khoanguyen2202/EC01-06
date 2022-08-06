import mongoose from "mongoose";
import { WarehouseModel } from "../models/WarehouseModel.js";
import { ProductModel } from "../models/ProductModel.js";
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
      } else {
        for (let k = 0; k < products[i].colors.length; k++) {
          let color = await WarehouseModel.find({
            "products.product_id": { $eq: products[i].product_id },
            warehouse_id: { $eq: warehouse_id },
            "products.colors.color": { $eq: products[i].colors[k].color },
          });
          if (color.length === 0) {
            addColor.push(products[i].colors[k]);
            // console.log(products[i].product_id);
            // console.log(addColor);
            const wh = await WarehouseModel.findOne({
              warehouse_id: warehouse_id,
            });
            const product = wh.products.find(
              (e) => e.product_id === products[i].product_id
            );
            const colors = product.colors.concat(addColor);
            product.colors = colors;
            // console.log(
            //   wh.products.find((e) => e.product_id === products[i].product_id)
            //     .colors
            // );
            await wh.save();
          } else {
            const wh = await WarehouseModel.findOne({
              warehouse_id: warehouse_id,
            });
            const product = wh.products.find((e) => {
              return e.product_id === products[i].product_id;
            });
            const color = product.colors.find(
              (e) => e.color === products[i].colors[k].color
            );
            let quantity = color.quantity + products[i].colors[k].quantity;
            color.quantity = quantity;

            await wh.save();
          }
        }
      }

      const productDB = await ProductModel.findOne({
        product_id: products[i].product_id,
      });

      if (!productDB) {
        await ProductModel.insertMany([products[i]]);
        res.status(200).json({ msg: "Add a product" });
      } else {
        for (let k = 0; k < products[i].colors.length; k++) {
          const colorDB = productDB.colors.find(
            (e) => e.color === products[i].colors[k].color
          );
          if (!colorDB) {
            await ProductModel.updateMany(
              { product_id: products[i].product_id },
              { $push: { colors: products[i].colors[k]} }
            );
            res.status(200).json({ msg: "add color" });
          }
        }
      }
    }

    // await WarehouseModel.findOneAndUpdate({ warehouse_id }, {products: addProduct });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
