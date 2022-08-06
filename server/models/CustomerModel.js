import mongoose from "mongoose";

const schema_customer = new mongoose.Schema(
  {
    phonenumber: {
      type: String,
      unique:true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    Address: {
      street: String,
      ward: String,
      district: String,
      city: String,
    },
    shippingAddress: [
      {
        street: String,
        ward: String,
        district: String,
        city: String,
      },
    ],
    role:{
      type:Number,
      default:1 //0:customer , != 0 : admit access
    },
    cart: [],
    history: [],
    hidden: Boolean,
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model("Customer", schema_customer);
