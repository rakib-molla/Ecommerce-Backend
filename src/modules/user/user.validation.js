import joi from 'joi';
// Validation schema for user registration
const createUserSchemaValidation = joi.object({
    name: joi.string().min(3).max(255).required().messages({
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    role: joi.string().valid('user', 'admin').default('user'),
    status: joi.string().valid('active', 'inactive').default('active'),
})

export default createUserSchemaValidation