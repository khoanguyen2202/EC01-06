import { ProductModel } from "../models/ProductModel.js";
export const listProducts = async (req, res) => {
  try {
    const { _id } = req.body;
    var list = [];
    var numberFound = 0;
    var notFound = 0;
    for (let i = 0; i < _id.length; i++) {
      var product = await ProductModel.findById(_id[i])
      if (product) {
        ++numberFound;
        var info = {
          productName: product.productName,
          productPrice: product.price,
          productColors:product.colors,
          productURL: product.images,
          productDiscount: product.discount,
          productFeature: product.feature,
        };
        list.push(info);
      } else {
        var info = { _id: _id[i], error: "Not found" };
        ++notFound
        list.push(info);
      }
    }

    res
      .status(200)
      .json({
        status: "success",
        input: _id.length,
        result: numberFound,
        notFound:notFound,
        list: list,
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getProducts = async (req, res) => {
  try {
    //query in DB
    const features = new APIfeatures(ProductModel.find(), req.query)
      .filtering()
      .sorting()
      .paginating();
    const products = await features.query;
    res.json({
      status: "success",
      result: products.length,
      products: products,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    //create product
    let {
      product_id,
      category,
      brandName,
      productName,
      price,
      colors,
      feature,
      description,
      rate,
      discount,
      reviews,
      images,
      sold,
      checked,
      restQuantity,
    } = req.body;
    if (!images) return res.status(400).json({ msg: "No images upload." });
    const product = await ProductModel.findOne({ product_id });
    if (product) {
      return res.status(400).json({ msg: "This product already exists." });
    }
    // if (discount !== 0) {
    //   price = (price * (100 - discount)) / 100;
    // }
    const newProduct = new ProductModel({
      product_id,
      category,
      brandName,
      productName,
      price,
      colors,
      feature,
      description,
      rate,
      discount,
      reviews,
      images,
      sold,
      checked,
      restQuantity,
    });
    await newProduct.save();
    res.json({ msg: "Created a product." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      product_id,
      category,
      brandName,
      productName,
      price,
      colors,
      feature,
      description,
      rate,
      discount,
      reviews,
      images,
      sold,
      checked,
      restQuantity,
    } = req.body;

    await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        product_id,
        category,
        brandName,
        productName,
        price,
        colors,
        feature,
        description: description.toLowerCase(),
        rate,
        discount,
        reviews,
        images,
        sold,
        checked,
        restQuantity,
      }
    );

    res.json({ msg: "Updated a product." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a product." });
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
    console.log(this.queryString.sort);
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
    const limit = this.queryString.limit * 1 || 140;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
