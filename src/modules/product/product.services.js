import ProductModel from "./product.model.js";

const getAllProduct = async () => {
	const result = await ProductModel.find({})
		.populate("categoryId")
		.populate("subCategoryId")
		.populate("subSubCategoryId")
		.lean();
	return result;
};

const createProduct = async (data) => {
	const result = await ProductModel.create(data);
	return result;
};

export const productServices = {
	getAllProduct,
	createProduct,
};
