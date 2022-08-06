import mongoose from "mongoose";

const schema_bill = new mongoose.Schema(
    {
        products:[
            {
                productID:String,
                quantity:Number,
                price:Number
            }
        ],
        payment:{
            type:Boolean,
            default:0 // 0: not paid yet, 1: already paid
        },
        totalPrice:Number,
        status:String,
        customerID:{
            type:String,
            required:true,
            default:"None",
        },
        warehouseID:{
            type:String,
            required:true,
            default:"None",
        },
        Cashier:String,

    },
    { timestamps: true }
);

export const BillModel = mongoose.model("Bill",schema_bill)