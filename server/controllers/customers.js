import { CustomerModel } from "../models/CustomerModel.js";
export const getCustomer = async (req, res) => {
  try {
    //query in DB
    const customers = await CustomerModel.find();
    console.log("customers", customers);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const {
      phonenumber,
      password,
      firstName,
      lastName,
      Address,
      shippingAddress,
    } = req.body;
    const existCustomer = await CustomerModel.findOne({ phonenumber });
    if (existCustomer) {
      return res.status(400).json({ msg: "This customer already exist." });
    }
    const newCustomer = new CustomerModel({
      phonenumber,
      password,
      firstName,
      lastName,
      Address,
      shippingAddress,
    });
    await newCustomer.save();
    res.json({ msg: "Created a customer." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;
    const username = await CustomerModel.findOne({ phonenumber });
    if (!username) {
      return res.status(400).json({ msg: "Username is not exist." });
    }
    if (username.password === password) {
      return res.status(200).json({ msg: "Sign in successful." });
    } else return res.status(400).json({ msg: "Incorrect password." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateInfor = async (req, res) => {
  try {
    const {
      phonenumber,
      password,
      firstName,
      lastName,
      Address,
      shippingAddress,
    } = req.body;
    const user = await CustomerModel.findOne({ phonenumber });
    if (user)
      return res.status(400).json({ msg: "This phonenumber is already used" });
    await CustomerModel.findOneAndUpdate(
      { _id: req.params.id },
      { phonenumber, password, firstName, lastName, Address, shippingAddress }
    );
    res.status(200).json({ msg: "Update successful." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const deleteUser = async (req, res) => {
//   try {
//     const { phonenumber } = req.body;
//     // const user = await CustomerModel.findOne({ phonenumber });
//     // if (!user) {
//     //   return res.status(400).json({ msg: "User is not exist." });
//     // }
//     await CustomerModel.deleteOne({phonenumber})
//     res.json({ msg: "Deleted customer" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };
