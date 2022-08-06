import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
{
    name: 
    {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
}, 
    {timestamps: true}
);

export const CategoryModel = mongoose.model("Category", categorySchema);