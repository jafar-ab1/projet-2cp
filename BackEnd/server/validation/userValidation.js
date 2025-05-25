// validators/userValidator.js
const Joi = require('joi');

const userSchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Le nom ne peut pas être vide',
      'string.min': 'Le nom doit contenir au moins {#limit} caractères',
      'any.required': 'Le nom est obligatoire'
    }),

  email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
          "string.email": "email must be of type Email",
          "any.required": "email is required"
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
      'any.only': 'Le rôle doit être client, admin'
    }),

  telephone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Le téléphone doit contenir 10 chiffres'
    })
});

const updateUserSchema = userSchema.fork(
  ['password', 'email', 'fullName', 'telephone'], 
  schema => schema.optional()
);

const emailSchema = Joi.object({
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
    "string.email": "email must be of type Email",
    "any.required": "email is required"
})
})

const sendEmailValidation = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
    "string.email": "email must be of type Email",
    "any.required": "email is required"
  }),
  roomNumber: Joi.array().items(
      Joi.string().required()
        .messages({
          'any.required': 'Le numéro de chambre est obligatoire'
        })
    ).min(1).max(20).required()
      .messages({
        'array.base': 'roomNumbers doit être un tableau',
        'array.min': 'Au moins une chambre doit être fournie',
        'array.max': 'Maximum 20 chambres par requête',
        'any.required': 'roomNumber est obligatoire'
      })

})


module.exports = { userSchema, updateUserSchema,  emailSchema, sendEmailValidation};