import { BillModel } from "../models/BillModel.js";

export const createBill = async (req, res) => {
  try {
    const { products, customerID, totalPrice, payment } = req.body;
    const newBill = new BillModel({
      products,
      customerID,
      totalPrice,
      payment,
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
    res.json({ msg: "Updated bill." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const billDetail = async (req, res) => {
  try {
    const { _id } = req.body;
    const billDetail = await BillModel.findById({ _id });
    res.json({
      billDetail,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteBill = async(req,res) =>{
    try {
        const { _id } = req.body;
        await BillModel.findByIdAndDelete({_id})
        res.json({msg:"Deleted bill."})
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
