import { ProductModel } from "../models/ProductModel.js";
import paypal from "paypal-rest-sdk";


const ctrlPayment = {
  getProducts: async (req, res) => {
    try {

      paypal.configure({
        mode: "sandbox", //sandbox or live
        client_id:
          "AXMeJ1HaMiTJqoZAXDezOC_NQtXZjYGH55WmJVTvqtrZgkva2xN1NkPQzR8eFyrUWR6TiK9y3YzWLpws",
        client_secret:
          "EDtLfGhK53kOEEbVhTb0kzwcLCwfmRBsgYzTvJ9q3HZ9SgWXL6fGlMWs33hCbKe7RQENxXkGpabYDmok",
      });

      const { products } = req.body;
      var totalPrice = 0;
      for (let i = 0; i < products.length; i++) {
        var product = await ProductModel.findById(products[i]._id);
        totalPrice +=
          ((product.price * (100 - product.discount)) / 100) *
          products[i].quantity;
      }
      totalPrice = (totalPrice / 23000).toFixed(2)

      const create_payment_json = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": "http://localhost:4000/success",
          "cancel_url": "http://localhost:4000/cancel"
        },
        "transactions": [{
          "amount": {
            "currency": "USD",
            "total": totalPrice.toString()
          },
          "description": "Accessory world"
        }]
      }

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          res.status(500).json({ msg: error.message });
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res
                .status(200)
                .json({
                  "link": payment.links[i].href
                });
              }
            }
        }
      });

    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default ctrlPayment;
