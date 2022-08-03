import mongoose from "mongoose";

const schema_warehouse = new mongoose.Schema(
  {
    warehouse_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    hotline: String,
    address: {
      street: String,
      ward: String,
      district: String,
      city: String,
    },
    products: [
      {
        product_id: {
          type: String,
          unique: true,
          trim: true,
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
      },
    ],
  },
  { timestamps: true }
);

export const WarehouseModel = mongoose.model("Warehouse", schema_warehouse);
