import mongoose from "mongoose";

const schema_product = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      
    },
    brandName: {
      type: String,
      trim: true,
      
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
      madeIn: {
        type: String,
        default: "Updating",
      },
      status: {
        type: String,
        default: "Updating",
      },
      insurance: {
        type: String,
        default: "Updating",
      },
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
        default: "No comment yet",
      },
    ],
    images: [
      {
        type: Object,
        required: true,
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    checked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", schema_product);
