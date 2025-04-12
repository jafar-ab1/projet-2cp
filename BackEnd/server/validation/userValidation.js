// validators/userValidator.js
const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Le nom ne peut pas être vide',
      'string.min': 'Le nom doit contenir au moins {#limit} caractères',
      'any.required': 'Le nom est obligatoire'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Veuillez fournir un email valide',
      'any.required': 'L\'email est obligatoire'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères',
      'any.required': 'Le mot de passe est obligatoire'
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

const updateUserSchema = userSchema.fork(
  ['password', 'email'], 
  schema => schema.optional()
);


module.exports = { userSchema, updateUserSchema };