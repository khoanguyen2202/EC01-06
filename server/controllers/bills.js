import { BillModel } from "../models/BillModel.js";
import { CustomerModel } from "../models/CustomerModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { WarehouseModel } from "../models/WarehouseModel.js";

///AIzaSyBQ2Ud93iGz28KmptQjCh2M_0_Pd9oTLQg

import axios from "axios";
function checkAddressExist(value, arr) {
  for (let index = 0; index < arr.length; index++) {
    if (
      value.street == arr[index].street &&
      value.ward == arr[index].ward &&
      value.district == arr[index].district &&
      value.city == arr[index].city
    )
      return true;
  }

  return false;
}

function combineAddress(street, ward, district, city) {
  return street + " " + ward + " " + district + " " + city;
}

async function getDistance(start, end) {
  var distance;
  var urlGoogleAPI =
    "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
    start +
    "&destinations=" +
    end +
    "&key=AIzaSyBQ2Ud93iGz28KmptQjCh2M_0_Pd9oTLQg";
  await axios
    .get(urlGoogleAPI)
    .then((res) => (distance = res.data.rows[0].elements[0].distance.value));
  return distance;
}
function checkProductExist( warehouse,products) {
  warehouse.products.forEach(e=>{
    for (let i = 0; i < products.length; i++) {
      if(e.product_id==products[i].product_id){
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          
        }
      }
      
    }
  })
}
async function deliveryManagement(products, sAddress) {
  var wh = await WarehouseModel.find();
  var distance = [];
  for (let i = 0; i < wh.length; i++) {
    distance.push(
      await getDistance(
        sAddress,
        combineAddress(
          wh[i].address.street,
          wh[i].address.ward,
          wh[i].address.district,
          wh[i].address.city
        )
      )
    );
  }

  var min = distance[0];
  var close = 0;
  for (let i = 1; i < distance.length; i++) {
    if (min > distance[i]) {
      min = distance[i];
      close = i;
    }
  }

  console.log(min);
  wh.splice(close, 1);
  console.log(...wh);
}
export const createBill = async (req, res) => {
  try {
    const { products, payment, customer_id, shippingAddress } = req.body;
    const customer = await CustomerModel.findOne({ customer_id });

    if (customer.shippingAddress.length < 0) {
      {
        customer.shippingAddress.push(shippingAddress);
        customer.save();
      }
    } else {
      if (!checkAddressExist(shippingAddress, customer.shippingAddress)) {
        customer.shippingAddress.push(shippingAddress);
        customer.save();
      }
    }

    var sAddress = combineAddress(
      shippingAddress.street,
      shippingAddress.ward,
      shippingAddress.district,
      shippingAddress.city
    );

    deliveryManagement(products, sAddress);

    // var warehouse = await WarehouseModel.find(); //Get warehouse database

    res.json({ msg: "Created a bill." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
    const findBill = await BillModel.findById({
      status: "Being delivery",
    }).exec();
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
    const findBill = await BillModel.findById({
      status: "Being delivery",
    }).exec();
    res.json({
      findBill,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const findProcessingBill = async (req, res) => {
  try {
    const findBill = await BillModel.find({ status: "In process" }).exec();
    res.json({
      findBill,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const findCancelledBill = async (req, res) => {
  try {
    const findBill = await BillModel.find({ status: "Canceled" }).exec();
    res.json({
      findBill,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const { _id } = req.body;
    await BillModel.findByIdAndDelete({ _id });
    res.json({ msg: "Deleted a bill." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
