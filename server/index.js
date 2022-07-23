import express from "express"
import bodyParser from "body-parser";
import cors from "cors";

import products from "./routers/products.js"
import customers from "./routers/customers.js"
import bills from "./routers/bills.js"
import warehouses from "./routers/warehouses.js"

import mongoose from "mongoose";

const app = express();
const PORT = process.env.port || 5000;
// const URI = "mongodb+srv://khoa:khoa@cluster0.i7wqs.mongodb.net/?retryWrites=true&w=majority";
const URI = "mongodb+srv://nnakhoa19:khoa@cluster0.yek0f.mongodb.net/?retryWrites=true&w=majority";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: "30mb"}));
app.use(cors());

app.use("/products",products)
app.use(customers)
app.use(bills)
app.use("/admin",warehouses)

mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`);
        }); 
    }).catch((err) => {
        console.log("err",err);
    });

