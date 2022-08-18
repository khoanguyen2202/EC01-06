import mongoose from "mongoose";

const schema_warehouse = new mongoose.Schema(
  {
    role: {
      type: String,  
      default:"Store",  
    },
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
    coordinate: {
      lat: Number,
      lon: Number,
      info: String,
    },
    products: [
      {
        product_id: {
          type: String,
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
