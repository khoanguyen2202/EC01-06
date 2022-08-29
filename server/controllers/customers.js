import { CustomerModel } from "../models/CustomerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const customerCtrl = {

  getCustomers : async (req, res) => {
    try {
      //query in DB
      const features = new APIfeatures(CustomerModel.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const customers = await features.query;
      res.json({
        status: "success",
        result: customers.length,
        customers: customers,
      });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
  },

  getInfo: async (req, res) => {
    try {
      //query in DB
      const {_id} = req.params
      const customer = await CustomerModel.findById(_id).select("-password");
      if (!customer) return res.status(400).json({ msg:"Customer does not exist" });
      res.json(customer)
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  createCustomer: async (req, res) => {
    try {
      const { phonenumber, password } = req.body;
      const existCustomer = await CustomerModel.findOne({ phonenumber });
      if (existCustomer) {
        return res.status(400).json({ msg: "This customer already exist." });
      }

      //password encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newCustomer = new CustomerModel({
        phonenumber,
        password: passwordHash,
      });

      //save mongodb
      await newCustomer.save();

      //create jsonwebtoken
      const accesstoken = createAccessToken({ id: newCustomer._id });

      const refreshtoken = createRefreshToken({ id: newCustomer._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/customers/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accesstoken });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  signIn: async (req, res) => {
    try {
      const { phonenumber, password } = req.body;
      const user = await CustomerModel.findOne({ phonenumber });
      if (!user) {
        return res.status(400).json({ msg: "Username is not exist." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/customers/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accesstoken });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  singOut: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/customers/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        return res.status(400).json({
          msg: "Please Login or Register",
        });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({
            msg: "Please Login or Register",
          });
        const accesstoken = createAccessToken({ id: user.id });

        res.json({  accesstoken });
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateInfor: async (req, res) => {
    try {
      const {
        phonenumber,
        password,
        firstName,
        lastName,
        Address,
        shippingAddress,
      } = req.body;
      const user = await CustomerModel.findOne({ phonenumber });
      if (user)
        return res
          .status(400)
          .json({ msg: "This phonenumber is already used" });
      await CustomerModel.findOneAndUpdate(
        { _id: req.params.id },
        { phonenumber, password, firstName, lastName, Address, shippingAddress }
      );
      res.status(200).json({ msg: "Update successful." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { phonenumber } = req.body;
      const user = await CustomerModel.findOne({ phonenumber });
      if (!user) {
        return res.status(400).json({ msg: "User is not exist." });
      }
      await CustomerModel.deleteOne({ phonenumber });
      res.json({ msg: "Deleted customer" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getCustomerCart: async (req,res) =>{
    try {
      const { phonenumber } = req.body;
      const user = await CustomerModel.findOne({ phonenumber });
      if (!user) {
        return res.status(400).json({ msg: "User is not exist." });
      }
      await CustomerModel.deleteOne({ phonenumber });
      res.json({ msg: "Deleted customer" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createCustomerCart: async (req,res) =>{
    try {
      const { phonenumber } = req.body;
      const user = await CustomerModel.findOne({ phonenumber });
      if (!user) {
        return res.status(400).json({ msg: "User is not exist." });
      }
      await CustomerModel.deleteOne({ phonenumber });
      res.json({ msg: "Deleted customer" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteCustomerCart: async (req,res) =>{
    try {
      const { phonenumber } = req.body;
      const user = await CustomerModel.findOne({ phonenumber });
      if (!user) {
        return res.status(400).json({ msg: "User is not exist." });
      }
      await CustomerModel.deleteOne({ phonenumber });
      res.json({ msg: "Deleted customer" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
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
    const limit = this.queryString.limit * 1 || 30;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default customerCtrl;
