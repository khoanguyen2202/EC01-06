import { CustomerModel } from "../models/CustomerModel.js";

const authAdmin = async (req, res, next) => {
  try {
    const user = await CustomerModel.findOne({ _id: req.user.id });
    if (user.role === 0)
      return res.status(400).json({ msg: "Admin resources access denied" });
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export default authAdmin;
