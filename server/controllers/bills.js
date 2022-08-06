import { BillModel } from "../models/BillModel.js";

export const createBill = async (req, res) => {
  try {
    const { products,payment,status,customerID,warehouseID} = req.body;
    const newBill = new BillModel({
      products,
      payment,
      status,
      customerID,
      warehouseID,
    });
    await newBill.save();
    res.json({ msg: "Created a bill." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateBill = async (req, res) => {
  try {
    const { _id, status, warehouseID, Cashier, payment } = req.body;
    await BillModel.findOneAndUpdate(
      { _id },
      { status, warehouseID, Cashier, payment }
    );
    res.json({ msg: "Updated a bill." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
/*
export const findBill = async (req, res) => {
  try {
    const { _id } = req.body;
    const findBill = await BillModel.findById({ _id });
    res.json({
      findBill,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};*/

export const findBill = async (req, res) => {
  try {
    const bills = await BillModel.find({ status: 'Being transported' }).exec();
    //const bills = await BillModel.find().exec();
    res.json(bills)
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
};

export const deleteBill = async(req,res) =>{
    try {
        const { _id } = req.body;
        await BillModel.findByIdAndDelete({_id})
        res.json({msg:"Deleted a bill."})
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
