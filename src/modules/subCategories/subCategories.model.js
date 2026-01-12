import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    // This field links a subcategory to its parent
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model name 
        required: true
    }
}, { timestamps: true });

const SubCategoryModel = mongoose.model('SubCategory', categorySchema);

export default SubCategoryModel;