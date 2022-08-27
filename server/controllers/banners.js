import { BannerModel } from "../models/BannerModel.js";

const ctrlBanner = {
  createBanner: async (req, res) => {
    try {
      const { link, state } = req.body;
      if (state == 1) {
        const allBanner = await BannerModel.find();
        allBanner.forEach(async (e) => {
          e.state = 0;
          await e.save();
        });
      }
      const newBanner = new BannerModel({
        link,
        state,
      });
      await newBanner.save();
      res.status(200).json({ msg: "Banner created." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteBanner: async (req, res) => {
    try {
      const { _id } = req.body;
      const deleteBanner = await BannerModel.deleteOne({ _id: _id });
      res.status(200).json({ msg: "Banner deleted." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateBanner: async (req, res) => {
    try {
      const { _id, link, state } = req.body;
      const banner = await BannerModel.findById({ _id: _id });
      if (state>=0) {
        
        if (state == 1) {
          const allBanner = await BannerModel.find();
          allBanner.forEach(async (e) => {
            e.state = 0;
            await e.save();
          });
          banner.state = state;
        } else { 
          banner.state = state;
        }
      }
      if (link) {
        for (let i = 0; i < link.length; i++) {
          if (link[i].link_img) {
            banner.link[link[i].position].link_img = link[i].link_img;
          }
          if (link[i].link_product) {
            banner.link[link[i].position].link_product = link[i].link_product;
          }
        }
      }
      await banner.save();
      res.status(200).json({ msg: "Banner updated." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAllBanner: async(req,res)=>{
    try {
        const allBanner = await BannerModel.find()
        res.status(200).json({
            status:"Success",
            length:allBanner.length,
            result:allBanner
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
  },
  getOneBanner:async(req,res)=>{
    try {
        const {_id} = req.params
        const banner = await BannerModel.findById({_id:_id})
        res.status(200).json({
            status:"Success",
            result:banner
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }
  }
};

export default ctrlBanner;
