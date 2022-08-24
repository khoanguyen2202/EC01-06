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

function HandleArrayObject(arr) {
  var temp1 = [];
  for (let i = 0; i < arr.length; i++) {
    var temp2 = [];
    for (let j = 0; j < arr[i].length; j++) {
      temp2.push(arr[i][j].warehouse_id);
    }
    temp1.push(temp2);
  }
  return temp1;
}

async function distanceInfo(customerAddress, warehouse_id) {
  var warehouseChoose;
  var warehouseAddress;

  warehouseChoose = await WarehouseModel.findOne({
    warehouse_id: warehouse_id,
  });
 
  warehouseAddress = combineAddress(
    warehouseChoose.address.street,
    warehouseChoose.address.ward,
    warehouseChoose.address.district,
    warehouseChoose.address.city
  );
  
  var distanceInfo = {
    info: warehouseChoose.warehouse_id,
    distance: await getDistance(customerAddress, warehouseAddress),
  };
  console.log(distanceInfo.info)
  
  return distanceInfo;
}
async function checkProduct(product, warehouse) {
  var get;
  var left
  for (let j = 0; j < warehouse.products.length; j++) {
    //Neu ton tai thi kiem tra so luong
    if (
      product.product_id == warehouse.products[j].product_id &&
      product.color == warehouse.products[j].color
    ) {
      // Neu du so luong thi cap nhat so luong trong warehouse center = 0 va cap nhat so luong trong product[i] = 0
      if (product.quantity == warehouse.products[j].quantity) {
        get = warehouse.products[j].quantity;
        left = 0;
        warehouse.products[j].quantity = 0;
        await warehouse.save();
        return {
          id: warehouse.warehouse_id,
          quantityGet: get,
          quantityLeft: left,
        };
      } else if (
        //Neu ko du so luong thi thi cap nhat so luong trong warehouse center = 0 va cap nhat lai so luong product[i] con thieu
        product.quantity > warehouse.products[j].quantity
      ) {
        get = warehouse.products[j].quantity;
        left = product.quantity - warehouse.products[j].quantity;
        warehouse.products[j].quantity = 0;
        await warehouse.save();
        return {
          id: warehouse.warehouse_id,
          quantityGet: get,
          quantityLeft: left,
        };
      } else if (product.quantity < warehouse.products[j].quantity) {
        get = product.quantity;
        warehouse.products[j].quantity -= product.quantity;
        left = 0;

        await warehouse.save();
        return {
          id: warehouse.warehouse_id,
          quantityGet: get,
          quantityLeft: left,
        };
      }
    }
  }
  return { id: "null", quantityGet: 0, quantityLeft: product.quantity };
}
async function updateWarehouse(product, warehouse) {
  for (let i = 0; i < warehouse.products.length; i++) {
    if (
      product.product_id === warehouse.products[i].product_id &&
      product.color === warehouse.products[i].color
    ) {
      warehouse.products[i].quantity -= product.quantity;
    }
  }
  await warehouse.save();
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
    //Cap nhat so luong san pham trong database products

    for (let i = 0; i < products.length; i++) {
      var updateProduct = await ProductModel.findOne({
        product_id: products[i].product_id,
      });
      for (let j = 0; j < updateProduct.colors.length; j++) {
        if (updateProduct.colors[j].color === products[i].color) {
          updateProduct.colors[j].quantity -= products[i].quantity;
          updateProduct.save();
        }
      }
    }

    let warehouseBill;
    var customerAddress = combineAddress(
      shippingAddress.street,
      shippingAddress.ward,
      shippingAddress.district,
      shippingAddress.city
    );

    var infoWH = []; // Each element in infoWH is a SUB Array containing warehouse_ids which storage the products in the order they were entered

    //Find warehouse which have inputProduct
    for (let i = 0; i < products.length; i++) {
      var findProductInWH = await WarehouseModel.aggregate([
        {
          $match: {
            $and: [
              { "products.product_id": products[i].product_id },
              { "products.color": products[i].color },
              { "products.quantity": { $gte: products[i].quantity } },
            ],
          },
        },
        { $project: { warehouse_id: "$warehouse_id" } },
      ]);
      // console.log(findProductInWH)
      if (findProductInWH.length > 0) {
        infoWH.push(findProductInWH);
      }
    }

    infoWH = HandleArrayObject(infoWH);
    
    var mergeArray = infoWH[0];
    // console.log(infoWH[0])
    for (let i = 1; i < infoWH.length; i++) {
      mergeArray = mergeArray.concat(infoWH[i]);
      // console.log(infoWH[i])
    }

    const countAppear = {};
    for (const element of mergeArray) {
      if (countAppear[element]) {
        countAppear[element] += 1;
      } else {
        countAppear[element] = 1;
      }
    }

    var appearThrough = 0; /// 0: khong co store nao chua toan bo san pham input, 1: co store chua toan bo san pham input
    for (const key in countAppear) {
      if (countAppear[key] === products.length) {
        appearThrough = 1;
      }
    }
    
    // console.log(warehouseDB)
    // console.log(infoWH);
    //Truong hop nhung warehouse chua toan bo san pham input
    if (appearThrough > 0) {
      var warehouseList = []; // List of warehouses that have all of the input products
      const warehouseDB = await WarehouseModel.find();
      /// This Loop to check warehouses which have all of the input products then push them to the warehouseList
      for (let i = 0; i < warehouseDB.length; i++) {
        var count = 0;
        var index;

        for (let j = 0; j < infoWH.length; j++) {
          if (infoWH[j].includes(warehouseDB[i].warehouse_id)) {
            index = i;
            ++count;
          }
        }

        if (count == infoWH.length) {
          warehouseList.push(warehouseDB[index].warehouse_id);
        }
      }
      //If there's only one warehouse has all of the input so We will deliver the order from that warehouse
      
      if (warehouseList.length === 1) {
        console.log("first");
        let distanceCusToStores = await distanceInfo(
          customerAddress,
          warehouseList[0]
        );
        
        var productWarehouse = await WarehouseModel.findOne({
          warehouse_id: distanceCusToStores.info,
        });
        
        for (let i = 0; i < products.length; i++) {
          await updateWarehouse(products[i], productWarehouse);
        }
        warehouseBill = distanceCusToStores.info;
        console.log(distanceCusToStores);
      }
      //If there more than one warehouse which has all of the input We will calculate the distance from each warehouse to the customer address
      else {
        console.log("second");
        let distanceCusToStores = [];
        
        for (let i = 0; i < warehouseList.length; i++) {
          distanceCusToStores.push(
            await distanceInfo(customerAddress, warehouseList[i])
          );
          console.log(await distanceInfo(customerAddress, warehouseList[i]))
        }
        
        distanceCusToStores.sort((a, b) => a.distance - b.distance);
        
        var productWarehouse = await WarehouseModel.findOne({
          warehouse_id: distanceCusToStores[0].info,
        });
        for (let i = 0; i < products.length; i++) {
          updateWarehouse(products[i], productWarehouse);
        }

        warehouseBill = distanceCusToStores[0].info;
      }
    } else {
      infoWH = [];

      // Nhung truong hop ma so luong cua san pham rai rac o nhieu store
      console.log("third");
      for (let i = 0; i < products.length; i++) {
        var findProductInWH = await WarehouseModel.aggregate([
          {
            $match: {
              $and: [
                { "products.product_id": products[i].product_id },
                { "products.color": products[i].color },
                { "products.quantity": { $gt: 0 } },
              ],
            },
          },
          { $project: { warehouse_id: "$warehouse_id" } },
        ]);
        if (findProductInWH.length > 0) {
          infoWH.push(findProductInWH);
        }
      }
      infoWH = HandleArrayObject(infoWH);
      console.log(infoWH);
      var warehouseList = infoWH[0];
      for (let i = 1; i < infoWH.length; i++) {
        for (let j = 0; j < infoWH[i].length; j++) {
          if (!warehouseList.includes(infoWH[i][j])) {
            warehouseList.push(infoWH[i][j]);
          }
        }
      }

      //Tim khoang cach tu cac store chua san pham input den dia chi khach hang
      let distanceCusToStores = [];
      // console.log(warehouseList)
      for (let i = 0; i < warehouseList.length; i++) {
        distanceCusToStores.push(
          await distanceInfo(customerAddress, warehouseList[i])
        );
        // console.log(distanceCusToStores[i])
      }
      distanceCusToStores.sort((a, b) => a.distance - b.distance);
      // console.log(distanceCusToStores)

      /// Tim khoang cach tu cac store chua san pham input den store duoc trong lam vi tri trung chuyen
      let distanceStoresToCenter = [];
      ////
      var warehouseCenter = await WarehouseModel.findOne({
        warehouse_id: distanceCusToStores[0].info,
      });
      warehouseBill = distanceCusToStores[0].info;
      ////

      var warehouseCenterAddress = combineAddress(
        warehouseCenter.address.street,
        warehouseCenter.address.ward,
        warehouseCenter.address.district,
        warehouseCenter.address.city
      );
      for (let i = 1; i < distanceCusToStores.length; i++) {
        distanceStoresToCenter.push(
          await distanceInfo(
            warehouseCenterAddress,
            distanceCusToStores[i].info
          )
        );
      }

      distanceStoresToCenter.sort((a, b) => a.distance - b.distance);
      // Voi moi san pham nhap vao
      var order = [];
      for (let i = 0; i < products.length; i++) {
        var p = [];
        // Kiem tra co ton tai trong Warehouse center
        var result = await checkProduct(products[i], warehouseCenter);
        // products[i].quantity = result.quantityLeft;
        if (result.id !== "null") {
          p.push(result);
        }

        var closer = 0;
        //Kiem tra cac Warehouse con lai
        while (result.quantityLeft > 0) {
          var warehouseCloser = await WarehouseModel.findOne({
            warehouse_id: distanceStoresToCenter[closer].info,
          });

          result = await checkProduct(products[i], warehouseCloser);
          // products[i].quantity = result.quantityLeft;
          if (result.id !== "null") {
            p.push(result);
          }
          ++closer;
        }
        order.push(p);
      }
      console.log(order);
    }
    var newBill = new BillModel({
      customer_id,
      shippingAddress,
      products,
      payment,
      warehouse_id: warehouseBill,
    });
    await newBill.save();
    res.json({ msg: "Created a bill." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    const { _id, status, warehouse_id, Cashier, payment } = req.body;
    var billExist = await BillModel.findOne({ _id })
    if(!billExist){
      res.status(400).json({ msg: "Updated a bill." });
    }
    await BillModel.findOneAndUpdate(
      { _id },
      { status, warehouse_id, Cashier, payment }
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
