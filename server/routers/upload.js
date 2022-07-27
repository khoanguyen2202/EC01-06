import express from "express";
import cloudinary from "cloudinary";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/upload",  (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0)  
      return res.status(400).send("No files were uploaded.");
    res.json("test upload");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;
