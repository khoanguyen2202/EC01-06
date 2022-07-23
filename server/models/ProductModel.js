import mongoose from "mongoose";

const schema_product = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
    },
    price: {
      type: Number,
    },
    colors: [
      {
        color: String,
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    feature: {
      madeIn: String,
      status: String,
      insurance: String,
    },

    description: {
      type: String,
      default: "Updating",
    },
    rate: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: String,
        defaut: "No comment yet",
      },
    ],
    attachments: [
      {
        type: String,
        default: "Updating",
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    hidden: Boolean,
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", schema_product);
