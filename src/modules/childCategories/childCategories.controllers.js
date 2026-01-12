import ApiResponse from "../../utils/ApiResponse.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { childCategoriesServices } from "./childCategories.services.js";
import { childCategoriesValidation } from "./childCategories.validation.js";

const getAllChildCategories = async(req, res, next)=>{
    try {
        const result = await childCategoriesServices.getAllChildCategories();
        if(!result || result.length ===0){
            return next(new ErrorHandler("Child Categories not Found", 404));
        }
        return res.status(200).json(
            new ApiResponse(200, "Child Categories Retrieved Successfully", result)
        )
    } catch (error) {
        next(error);
    }
}

const addChildCategories = async(req, res, next)=>{
    try{
        const { error, value } = childCategoriesValidation.validate(req.body, {
        abortEarly: false // সব error একসাথে দেখাবে
        });

        if (error) {
            const errors = {};
            error.details.forEach(err => {
                const fieldName = err.path[0];
                errors[fieldName] = err.message;
            });

            return res.status(422).json({
                success: false,
                statusCode:422,
                message: "Validation failed",
                errors
            });
        }

        const result = await childCategoriesServices.createChildCategories(req.body);
        if(!result){
            return next(new ErrorHandler("Failed to create Child Category", 400));
        }
        return res.status(200).json(
            new ApiResponse(200, "Child Category Created Successfully", result)
        )

    }catch(error){
        next(error);
    }
}

export const childCategoriesControllers = {
    getAllChildCategories,
    addChildCategories
};