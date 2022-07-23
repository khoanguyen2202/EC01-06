import { WarehouseModel } from "../models/WarehouseModel.js";

export const createWarehouse = async (req, res) => {
  try {
    const { hotline, address } = req.body;
    const newWarehouse = new WarehouseModel({
      hotline,
      address,
    });
    await newWarehouse.save();
    res.json(newWarehouse);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteWarehouse = async (req, res) => {
  try {
    const {_id} = req.body
    await WarehouseModel.findByIdAndDelete({_id})
    res.json({msg:"Deleted warehouse"})
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const listWarehouse = async (req,res)=>{
    try {
        const warehouses = await WarehouseModel.find()
        res.json(warehouses)
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
