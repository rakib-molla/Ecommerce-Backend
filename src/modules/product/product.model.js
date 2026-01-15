
import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type: String, require: true},
    metaTitle: {type: String, require: true},
    slug: {type: String, require: true},
    image: { type: String, required: true },
    stockQuantity: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    review: { type: Number, default: 0 },
    status: {
    type: String, required: true, enum: ['pending', 'published', 'draft'],default: 'published'},
    isFeatured: { type: Boolean, default: false },
    description: {type: String, require: false},
    price: {type: Number, require: true},
    discount: {type: Number, require: false},
    coupon:{type: String, required: false},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref:'Category', require: true},
    subCategoryId: {type: mongoose.Schema.Types.ObjectId, ref:'SubCategory', require: false},
    subSubCategoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'ChildCategory', require: false},
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
