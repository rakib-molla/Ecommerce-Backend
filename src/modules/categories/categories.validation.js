import joi from 'joi';

// Validation schema for category creation
const categorySchemaValidation = joi.object({
    name: joi.string().min(3).max(100).required().messages({
      'string.empty': 'Category name is required',
      'any.required': 'Category name is required'
    }),
    description: joi.string().min(0).max(900).optional(),
})

export default categorySchemaValidation;