import { ProductModel } from "../models/ProductModel.js";
export const getProducts = async (req, res) => {
  try {
    //query in DB

    const products = await ProductModel.find();
    console.log("products", products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createProduct = async (req, res) => {
  try {
    //create product
    const {
      type,
      brandName,
      productName,
      price,
      colors,
      feature,
      description,
      rate,
      discount,
      reviews,
      attachments,
      sold,
    } = req.body;
    // const product = await ProductModel.findOne({_id});
    // if(product){
    //   return res.status(400).json({msg:"This product already exists"})
    // }
    const newProduct = new ProductModel({
      type,
      brandName,
      productName,
      price,
      colors,
      feature,
      description,
      rate,
      discount,
      reviews,
      attachments,
      sold,
    })
    await newProduct.save();
    res.json({ msg: "Created a product" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      type,
      brandName,
      productName,
      price,
      colors,
      feature,
      description,
      rate,
      discount,
      reviews,
      attachments,
      sold,
    } = req.body;
    await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        type,
        brandName,
        productName,
        price,
        colors,
        feature,
        description,
        rate,
        discount,
        reviews,
        attachments,
        sold,
      }
    )

    res.json({ msg: "Updated a product" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteProduct = async(req,res) =>{
  try {
    await ProductModel.findByIdAndDelete(req.params.id)
    res.json({msg:"Deleted a product"})
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
