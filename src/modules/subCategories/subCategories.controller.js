import ApiResponse from "../../utils/ApiResponse.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { subCategoriesServices } from "./subCategories.services.js";

const getAllSubCategoriesController = async(req, res, next) => {
    try {
        const result = await subCategoriesServices.getAllSubCategoriesService();
        if (!result || result.length === 0) {
            return next(new ErrorHandler("Sub Categories not Found", 404));
        }
        return res.status(200).json(
            new ApiResponse(200, "Sub Categories Retrieved Successfully", result)
        );
    } catch (error) {
        next(error);    
    }
}

const addSubCategoryController = async(req, res, next) => {
    try {
        // Implementation for adding a sub-category can be added here
        const result = await subCategoriesServices.addSubCategoryService(req.body);

        if (!result) {
            return next(new ErrorHandler("Sub Category not Created", 404));
        }
        return res.status(200).json(
            new ApiResponse(200, "Sub Category Created Successfully", result)
        );
    } catch (error) {
        next(error);
    }
}

export const subCategoriesController = {
    getAllSubCategoriesController,
    addSubCategoryController
}