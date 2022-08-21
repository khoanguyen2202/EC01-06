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
      type:Number,
      default:0,
    },
    status: String, //Delivery successful   Being delivery   In process  Canceled
    customer_id: {
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

    warehouseID: {
      type: String,
      default: "None",
    },
    Cashier: String,
  },
  { timestamps: true }
);

export const BillModel = mongoose.model("Bill", schema_bill);
