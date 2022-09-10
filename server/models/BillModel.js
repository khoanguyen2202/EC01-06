import mongoose from "mongoose";

const schema_bill = new mongoose.Schema(
  {
    products: [
      {
        product_id: String,
        color: String,
        quantity: Number,
      },
    ],
    payment: {
      //0:not yet paid    1:paid
      type: Boolean,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    phonenumber: {
      type: String,
      required: true,
      default: "None",
    },
    shippingAddress: {
      street: String,
      ward: String,
      district: String,
      city: String,
    },
    shippingPhonenumber: {
      type: String,
      default: "None",
    },
    name: {
      type: String,
      default: "None",
    },
    status: {
      type: String,
      default: "Dang xu ly", /// DangXuLy, DangGiao, HoanThanh, Huy
    },
    email: {
      type: String,
      default: "None",
    },
    warehouse_id: {
      type: String,
      default: "None",
    },
    Cashier: String,
  },
  { timestamps: true }
);

export const BillModel = mongoose.model("Bill", schema_bill);
