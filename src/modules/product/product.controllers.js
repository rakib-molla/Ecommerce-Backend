import ApiResponse from "../../utils/ApiResponse.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { productServices } from "./product.services.js";

const getAllProduct = async (req, res, next) => {
	try {
		const result = await productServices.getAllProduct();
		if (!result || result.length === 0) {
			return next(new ErrorHandler("Product Not found", 400));
		}
		return res
			.status(200)
			.json(new ApiResponse(200, "Product Get Successfully", result));
	} catch (error) {
		next(error);
	}
};

const createProduct = async (req, res, next) => {
	try {
        
		const result = await productServices.createProduct(req.body);
		if (!result) {
			return next(new ErrorHandler("Failed to create Product", 400));
		}
		return res
			.status(200)
			.json(
				new ApiResponse(200, "Product Created Successfully", result),
			);
	} catch (error) {
		next(error);
	}
};

export const productControllers = {
	getAllProduct,
	createProduct,
};
