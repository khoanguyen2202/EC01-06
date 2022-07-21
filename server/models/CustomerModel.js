import mongoose from "mongoose";

const schema_customer = new mongoose.Schema(
  {
    phonenumber:{
      type:String,
      required:true
    },
    password: {
      type:String,
      required:true
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
    hidden: Boolean,
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model("Customer", schema_customer);
