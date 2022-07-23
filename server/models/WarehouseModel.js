import mongoose from "mongoose";

const schema_warehouse = new mongoose.Schema({
  hotline: String,
  address: {
    street: String,
    ward: String,
    district: String,
    city: String,
  },
});

export const WarehouseModel = mongoose.model("Warehouse",schema_warehouse)