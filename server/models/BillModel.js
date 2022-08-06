import mongoose from "mongoose";

const schema_bill = new mongoose.Schema(
    {
        products:
        [
            {
                productID:String,
                quantity:Number,
                price:Number
            }
        ],
        payment:{          //0:not yet paid    1:paid
            type:Boolean,
            default:0
        },
        totalPrice:Number,
        status:String,      //Delivery successful   Being transported   Processing
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
