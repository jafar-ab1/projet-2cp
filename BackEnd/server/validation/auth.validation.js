import Joi from "joi";

export const registerUserValidationSchema = Joi.object({
    username: Joi.string().min(3).max(20).required().messages({
        "string.min": "username min length is 3",
        "string.max": "username max length is 20",
        "any.required": "username is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "email must be an email",
        "any.required": "email is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "password min length is 8",
        "any.required": "password is required"
    }),
    userRole: Joi.string()
        .valid('client', 'admin')
        .default('client')
        .messages({
          'any.only': 'Le rôle doit être client, admin ou employé'
        }),
    
    telephone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
          'string.pattern.base': 'Le téléphone doit contenir 10 chiffres'
        })
});

export const loginUserValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "email must be an email",
        "any.required": "email is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "password min length is 8",
        "any.required": "password is required"
    })
})