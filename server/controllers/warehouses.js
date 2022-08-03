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
    const {
      warehouse_id,

      products
      // images,}
    } = req.body;
    // if (!images) return res.status(400).json({ msg: "No images upload." });
    const warehouse = await WarehouseModel.findOne({ warehouse_id });
    if (!warehouse)
      return res.status(400).json({ msg: "Warehouse ID not exists." });
    // const product = await WarehouseModel.find ({ warehouse_id, product_id });
    // if (product) {
    //   return res.status(400).json({ msg: "This product already exists." });
    // }
    await WarehouseModel.findOneAndUpdate(
      { warehouse_id },
      {
        products
        // images,}
      }
    );
    res.json({ msg: "Add a product." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
