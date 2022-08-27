import { ProductModel } from "../models/ProductModel.js";
import paypal from "paypal-rest-sdk";
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AXMeJ1HaMiTJqoZAXDezOC_NQtXZjYGH55WmJVTvqtrZgkva2xN1NkPQzR8eFyrUWR6TiK9y3YzWLpws",
  client_secret:
    "EDtLfGhK53kOEEbVhTb0kzwcLCwfmRBsgYzTvJ9q3HZ9SgWXL6fGlMWs33hCbKe7RQENxXkGpabYDmok",
});

const ctrlPayment = {
  getProducts: async (req, res) => {
    try {
      const { products } = req.body;
      var totalPrice = 0;
      for (let i = 0; i < products.length; i++) {
        var product = await ProductModel.findById(products[i]._id);
        totalPrice +=
          ((product.price * (100 - product.discount)) / 100) *
          products[i].quantity;
      }
      res
        .status(200)
        .json({ status: "Success", total: totalPrice, list: products });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:4000/success",
        cancel_url: "http://localhost:4000/cancel",
      },
      transactions: [
        {
          item_list: {
            items: items,
          },
          amount: {
            currency: "USD",
            total: total.toString(),
          },
          description: "Hat for the best team ever",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        res.status(400).json({ msg: error.message });
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
            console.log(payment.links[i].href);
          }
        }
      }
    });
  },
};

export default ctrlPayment;
