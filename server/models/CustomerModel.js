import mongoose from "mongoose";

const schema_customer = new mongoose.Schema(
  {
    phonenumber: {
      type: String,
      unique: true,
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
    role: {
      type: Number,
      default: 0, // 0:customer , 1: admit access
    },
    state: {
      type: String,
      default: "activate",
    },	
    cart: [
      {
        product_id: {
          type: String,
          trim: true,
        },
        color: {
          type: String,
          trim: true,
        },
        quantity: {
          type: Number,
          default: 0,
        },
        status: {
          type: String, // true: Not existed in Cart     false: Existed in Cart
          trim: true,
        },
      },
    ],
    history: [],
    hidden: Boolean,
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model("Customer", schema_customer);
