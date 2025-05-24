import Joi from "joi";

export const registerUserValidationSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
        "string.email": "email must be of type Email",
        "any.required": "email is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "password min length is 8",
        "any.required": "password is required"
    }),
    mobileNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
          'string.pattern.base': 'mobile-number should be a mobile number',
          "any.required": "mobile-number is required",
        }),
    fullName: Joi.string().min(3).max(20).required().messages({
        "string.min": "full-name length must be above 3",
        "string.max": "full-name length must be below 20",
        "any.required": "full-name is required",
    }),
    role : Joi.string().valid("admin", "client").default("client")
});

export const loginUserValidationSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
        "string.email": "email must be of type Email",
        "any.required": "email is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "password min length is 8",
        "any.required": "password is required"
    })
})