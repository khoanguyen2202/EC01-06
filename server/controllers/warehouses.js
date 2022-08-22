import { WarehouseModel } from "../models/WarehouseModel.js";
import { ProductModel } from "../models/ProductModel.js";

export const createWarehouse = async (req, res) => {
  try {
    const { warehouse_id, hotline, address } = req.body;
    var warehouseExist = await WarehouseModel.findOne({warehouse_id})
    if(warehouseExist){
      res.status(400).json({msg:"Warehouse already exist."})
    }
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
    const { warehouse_id } = req.body;
    var warehouseExist = await WarehouseModel.findOne({warehouse_id})
    if(!warehouseExist){
      res.status(400).json({msg:"Warehouse not exist."})
    }
    await WarehouseModel.findOneAndDelete({ warehouse_id });
    res.json({ msg: "Deleted warehouse" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const findWarehouse = async (req, res) => {
  try {
    const features = await WarehouseModel.aggregate([
                                                    {
                                                      $unwind: "$products",
                                                    },
                                                    {
                                                      $match: {
                                                        "products.product_id": req.query.product_id,
                                                      },
                                                    },
                                                    {
                                                      $group: {
                                                        _id: {
                                                          warehouse_id: "$warehouse_id",
                                                          hotline: "$hotline",
                                                          address: "$address",
                                                        },
                                                        products: {
                                                          $push: "$products",
                                                        },
                                                      },
                                                    },
                                                  ])
    res.json({
      status: "success",
      result: features.length,
      products: features,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; // queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      //gte greater than or equal
      // gt grater than
      //lt lesser than
      //lte lesser than or equal
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));
    console.log(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 28;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export const inputProduct = async (req, res) => {
  try {
    //Input product into warehouse
    const { warehouse_id, products } = req.body;

    //Check warehouse exist
    var warehouse = await WarehouseModel.findOne({ warehouse_id });
    if (!warehouse)
      return res.status(400).json({ msg: "Warehouse ID not exists." });

    let addProduct;

    //Check products exist in warehouse
    for (let i = 0; i < products.length; ++i) {
      for (let j = 0; j < warehouse.products.length; j++) {
        if (
          products[i].product_id == warehouse.products[j].product_id &&
          products[i].color == warehouse.products[j].color
        ) {
          warehouse.products[j].quantity += products[i].quantity;
          await warehouse.save();
          addProduct = undefined;
          break;
        } else {
          addProduct = products[i];
        }
      }
      console.log(addProduct);
      if (addProduct) {
        await WarehouseModel.updateOne(
          { warehouse_id: warehouse_id },
          { $push: { products: addProduct } }
        );
      }

      //Synchronize the warehouse's products with the product schema

      // Check if the product added
      const productDB = await ProductModel.findOne({
        product_id: products[i].product_id,
      });

      //If the product not added then insert document
      if (!productDB) {
        await ProductModel.insertMany([products[i]]);
      }

      //If product exist then check If its color exist
      else {
        const colorDB = productDB.colors.find(
          (e) => e.color === products[i].color
        );

        //If that color not exist then push to that product
        if (!colorDB) {
          await ProductModel.updateMany(
            { product_id: products[i].product_id },
            {
              $push: {
                colors: {
                  color: products[i].color,
                  quantity: products[i].quantity,
                },
              },
            }
          );
        }
        //If color exist then update the quantity by adding
        else {
          colorDB.quantity += products[i].quantity;
          await productDB.save();
          console.log(colorDB);
        }
      }
    }
    res.status(200).json({ msg: "Input a product" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateWarehouse = async(req,res)=>{
  try {
    const {warehouse_id,hotline,address} = req.body
    var warehouseExist = await WarehouseModel.findOne({warehouse_id})
    if(!warehouseExist){
      res.status(400).json({msg:"Warehouse not exist."})
    }
    warehouseExist.hotline = hotline
    warehouseExist.address = address
    await warehouseExist.save()
    res.status(200).json({msg:"Updated Warehouse."})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
