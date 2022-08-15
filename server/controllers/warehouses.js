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

export const findWarehouse = async (req, res) => {
  try {
    const features = await WarehouseModel.aggregate
                                                  ([{
                                                    $unwind: "$products"
                                                  },
                                                  {
                                                    $match: {
                                                      "products.product_id" : req.query.product_id
                                                        }
                                                  },
                                                  {
                                                    $group: {
                                                      _id: {
                                                        warehouse_id: "$warehouse_id",
                                                        hotline: "$hotline",
                                                        address: "$address"
                                                      },
                                                      products: {
                                                        $push: "$products",    
                                                      },
                                                            }
                                                  }])
      // .filtering()
      // .sorting()
      // .paginating();
    //const products = await features.query;
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
    const warehouse = await WarehouseModel.findOne({ warehouse_id });
    if (!warehouse)
      return res.status(400).json({ msg: "Warehouse ID not exists." });

    let addProduct = [];
    let addColor = [];

    //Check products exist in warehouse
    for (let i = 0; i < products.length; ++i) {
      let product = await WarehouseModel.find({
        "products.product_id": { $eq: products[i].product_id },
        warehouse_id: { $eq: warehouse_id },
      });

      //If product not exist in warehouse then push
      if (product.length === 0) {
        addProduct.push(products[i]);
        await WarehouseModel.updateMany(
          { warehouse_id: warehouse_id },
          { $push: { products: addProduct } }
        );

        //If product exist then check its color exist
      } else {
        for (let k = 0; k < products[i].colors.length; k++) {
          let color = await WarehouseModel.find({
            "products.product_id": { $eq: products[i].product_id },
            warehouse_id: { $eq: warehouse_id },
            "products.colors.color": { $eq: products[i].colors[k].color },
          });

          //If that color not exist then push into that product color
          if (color.length === 0) {
            addColor.push(products[i].colors[k]);
            const wh = await WarehouseModel.findOne({
              warehouse_id: warehouse_id,
            });
            const product = wh.products.find(
              (e) => e.product_id === products[i].product_id
            );
            const colors = product.colors.concat(addColor);
            product.colors = colors;
            await wh.save();

            //If that color exist then add the input quantity to its current quantity
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
      //Synchronize the warehouse's products with the product schema

      //Check if the product added
      const productDB = await ProductModel.findOne({
        product_id: products[i].product_id,
      });

      //If the product not added then insert document
      if (!productDB) {
        await ProductModel.insertMany([products[i]]);
      }

      //If product exist then check If its color exist
      else {
        for (let k = 0; k < products[i].colors.length; k++) {
          const colorDB = productDB.colors.find(
            (e) => e.color === products[i].colors[k].color
          );

          //If that color not exist then push to that product
          if (!colorDB) {
            await ProductModel.updateMany(
              { product_id: products[i].product_id },
              { $push: { colors: products[i].colors[k] } }
            );
          }
          //If color exist then update the quantity by adding
          else {
            colorDB.quantity += products[i].colors[k].quantity;
            await productDB.save();
            console.log(colorDB);
          }
        }
      }
    }
    res.status(200).json({ msg: "Updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
