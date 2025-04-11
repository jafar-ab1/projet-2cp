const Joi = require("joi");

const registerUserValidationSchema = Joi.object({
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
    })
});

const loginUserValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "email must be an email",
        "any.required": "email is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "password min length is 8",
        "any.required": "password is required"
    })
})

module.exports ={ registerUserValidationSchema,
loginUserValidationSchema};