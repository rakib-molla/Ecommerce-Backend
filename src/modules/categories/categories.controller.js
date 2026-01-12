import ApiResponse from "../../utils/ApiResponse.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { categoriesServices } from "./categories.services.js";
import categorySchemaValidation from "./categories.validation.js";

const addCategoriesController = async(req, res, next) => {
    try {
        const dataValidation = await categorySchemaValidation.validateAsync(req.body);
        
        const result = await categoriesServices.addCategoryService(dataValidation);

        if (!result) {
            return next(new ErrorHandler("Category not Created", 404));
        }
        return res.status(200).json(
            new ApiResponse(200, "Categories Created Successfully", result)
        );
    } catch (error) {
        next(error);
    }
}

const getAllCategoriesController = async(req, res, next) => {
    try {
        const result = await categoriesServices.getAllCategoriesService();
        if (!result || result.length === 0) {
            return next(new ErrorHandler("Categories not Found", 404));
        }
        return res.status(200).json(
            new ApiResponse(200, "Categories Retrieved Successfully", result)
        );
    } catch (error) {
        next(error);
    } 
}
          


export const categoriesController = {
    addCategoriesController,
    getAllCategoriesController
}