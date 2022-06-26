import mongoose from "mongoose";

const schema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
    },
    sku:{
        type: String,
        required: true
    },
    price:{
        type: Number,
    },
    color:{
        type: String,
    },
    quantity:{
        type: Number,
        default: 0
    },
    feature:{
        type: String,
        default: "Updating"
    },
    attachment: String,
    hidden: Boolean
},{ timestamps: true })

export const ProductModel = mongoose.model("Product",schema);