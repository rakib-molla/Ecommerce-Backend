import Joi from "joi";

export const childCategoriesValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Sub Sub Category name must be a string",
      "string.empty": "Sub Sub Category name is required",
      "string.min": "Sub Sub Category name must be at least 3 characters",
      "string.max": "Sub Sub Category name must be at most 30 characters",
      "any.required": "Sub Sub Category name is required"
    }),

  description: Joi.string()
    .max(500)
    .allow("")
    .messages({
      "string.base": "Description must be a string",
      "string.max": "Description must be at most 500 characters"
    }),

  categoryId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": "Category Id is required",
      "string.hex": "Category Id must be a valid MongoDB ObjectId",
      "string.length": "Category Id must be a valid MongoDB ObjectId",
      "any.required": "Category Id is required"
    }),

  subCategoryId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": "Sub Category Id is required",
      "string.hex": "Sub Category Id must be a valid MongoDB ObjectId",
      "string.length": "Sub Category Id must be a valid MongoDB ObjectId",
      "any.required": "Sub Category Id is required"
    })
});


