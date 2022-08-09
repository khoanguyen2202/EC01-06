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

export const findAllBill = async (req, res) => {
  try {
    //query in DB
    const features = new APIfeatures(BillModel.find(), req.query)
      .filtering()
      .sorting()
      .paginating();
    const bills = await features.query;
    res.json({
      status: "success",
      result: bills.length,
      bills: bills,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const findSuccessBill = async (req, res) => {
  try {
    const findBill = await BillModel.findById({ status: 'Being delivery'}).exec();
    res.json({
      findBill,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const findDeliveryBill = async (req, res) => {
  try {
    const { _id } = req.body;
    const findBill = await BillModel.findById({ status: 'Being delivery'}).exec();
    res.json({
      findBill,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const findProcessingBill = async (req, res) => {
  try {
    const findBill = await BillModel.find({ status: 'In process' }).exec();
    res.json({
      findBill,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const findCancelledBill = async (req, res) => {
  try {
    const findBill = await BillModel.find({ status: 'Canceled' }).exec();
    res.json({
      findBill,
    });
  } catch (error) {
    res.status(500).json({ error: error });
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


class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }
  filtering(){
     const queryObj = {...this.queryString} //queryString = req.query

     const excludedFields = ['page', 'sort', 'limit']
     excludedFields.forEach(el => delete(queryObj[el]))
     
     let queryStr = JSON.stringify(queryObj)
     queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

  //    gte = greater than or equal
  //    lte = lesser than or equal
  //    lt = lesser than
  //    gt = greater than
     this.query.find(JSON.parse(queryStr))
       
     return this;
  }

  sorting(){
      if(this.queryString.sort){
          const sortBy = this.queryString.sort.split(',').join(' ')
          this.query = this.query.sort(sortBy)
      }else{
          this.query = this.query.sort('-createdAt')
      }

      return this;
  }

  paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 9
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }
}
