import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"

import products from "./routers/products.js";
import customers from "./routers/customers.js";
import bills from "./routers/bills.js";
import warehouses from "./routers/warehouses.js";
import upload from "./routers/upload.js";
import categoryCtrl from "./routers/categories.js";

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
const app = express();
const PORT = process.env.port || 5000;
// const URI = "mongodb+srv://khoa:khoa@cluster0.i7wqs.mongodb.net/?retryWrites=true&w=majority";
const URI = process.env.MONGODB_URL

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

app.use("/products", products);
app.use("/customers", customers);
app.use("/bills", bills);
app.use("/warehouses", warehouses);
app.use("/api", upload);
app.use("/category",categoryCtrl);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
