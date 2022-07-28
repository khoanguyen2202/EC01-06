import mongoose from "mongoose";

const schema_product = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      required: true,
    },
    brandName: {
      type: String,
      trim: true,
      required: true,
    },
    productName: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
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
    images: [
      {
        type: Object,
        default: "Updating",
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", schema_product);
