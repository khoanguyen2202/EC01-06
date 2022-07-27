import { CustomerModel } from "../models/CustomerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const customerCtrl = {
  getCustomer: async (req, res) => {
    try {
      //query in DB
      const customer = await CustomerModel.findById(req.customer.id).select("-password");
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
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export default customerCtrl;
