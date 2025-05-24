const Joi = require('joi');

const passwordSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
              "string.email": "email must be of type Email",
              "any.required": "email is required"
          }),
    
      newPassword: Joi.string()
        .min(6)
        .required()
        .messages({
          'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères',
          'any.required': 'Le mot de passe est obligatoire'
        }),
      code: Joi.number().required()
})

module.exports = { passwordSchema};

