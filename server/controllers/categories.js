import { CategoryModel } from "../models/CategoryModel.js";

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await CategoryModel.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {name} = req.body;
            const category = await CategoryModel.findOne({name})
            if(category) return res.status(400).json({msg: "This category already exists."})

            const newCategory = new CategoryModel({name})

            await newCategory.save()
            res.json({msg: "Created a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            const products = await CategoryModel.findOne({category: req.params.name})
            if(products) return res.status(400).json({
                msg: "Please select name of category."
            })

            await CategoryModel.findByIdAndDelete(req.params.name)
            res.json({msg: "Deleted a Category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await CategoryModel.findOneAndUpdate({name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default categoryCtrl;