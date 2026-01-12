import mongoose from "mongoose";

const childCategorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: false},
    description: {type: String, required: false},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    subCategoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const ChildCategory = mongoose.model('ChildCategory', childCategorySchema);

export default ChildCategory;