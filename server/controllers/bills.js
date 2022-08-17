import { BillModel } from "../models/BillModel.js";
import { CustomerModel } from "../models/CustomerModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { WarehouseModel } from "../models/WarehouseModel.js";


///AIzaSyBQ2Ud93iGz28KmptQjCh2M_0_Pd9oTLQg
import fetch from "node-fetch";
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ2Ud93iGz28KmptQjCh2M_0_Pd9oTLQg&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

async function findWay(start, end) {
  var dstart = new google.maps.LatLng(start.lat, start.lon);
  var dend = new google.maps.LatLng(end.lat, end.lon);

  var dservice = new google.maps.DirectionsService();

  var ddisplay = new google.maps.DirectionsRenderer();
  ddisplay.setMap(map);

  var req = {
    origin: dstart,
    destination: dend,
    travelMode: "DRIVING",
    // provideRouteAlternatives: true,
  };

  await dservice.route(req, (result, status) => {
    if (status == "OK") {
      // ddisplay.setDirections(result);

      console.log(result.routes[0].legs[0].distance);
    } else {
      ddisplay.setDirections({ routes: [] });

      map.setCenter(dstart);
    }
  });
}

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

async function convertToCoordinate(address) {
  var addressArr = [];
  var url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
    address;

  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      addressArr = data;
    })
    .catch((err) => console.log(err));
  return addressArr[0];
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
      var addressToString =
        shippingAddress.street +
        " " +
        shippingAddress.ward +
        " " +
        shippingAddress.district +
        " " +
        shippingAddress.city;
    }

    var location = await convertToCoordinate(addressToString);
    var coordinate = {
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
    };
    console.log(coordinate);
    var productList = [];

    for (let index = 0; index < products.length; index++) {
      productList.push(
        await ProductModel.findOne({
          product_id: products[index].product_id,
        }).exec()
      );
    }

    var warehouse = [];
    for (let i = 0; i < productList.length; i++) {
      for (let k = 0; k < productList[i].warehouse_id.length; k++) {
        // console.log(productList[i].warehouse_id[k])
        warehouse.push(
          await WarehouseModel.findOne({
            warehouse_id: productList[i].warehouse_id[k],
          })
        );
      }
      console.log(warehouse[0].coordinate);
    }

    findWay(coordinate, warehouse[0].coordinate);

    // const newBill = new BillModel({
    //   products,
    //   payment,
    //   shippingAddress,
    //   customer_id,
    // });

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
