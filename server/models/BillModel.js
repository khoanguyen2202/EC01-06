import mongoose from "mongoose";

const schema_bill = new mongoose.Schema(
  {
    products: [
      {
        productID: String,
        colors: [
          {
            color: {
              type: String,
              trim: true,
            },
            quantity: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    ],
    payment: {
      //0:not yet paid    1:paid
      type: Boolean,
      default: 0,
    },
    totalPrice: Number,
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
      required: true,
      default: "None",
    },
    Cashier: String,
  },
  { timestamps: true }
);

export const BillModel = mongoose.model("Bill", schema_bill);
