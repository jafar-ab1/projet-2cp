const Joi = require('joi');

// Schéma pour la création
const createSchema = Joi.object({
  comment: Joi.string().min(5).max(500).required().messages({
    'string.min': 'Le commentaire doit contenir au moins 5 caractères',
    'string.max': 'Le commentaire ne peut pas dépasser 500 caractères',
    'any.required': 'Le commentaire est obligatoire'
  }),
  date: Joi.date().required().messages({
    'date.base': 'Doit être une date valide'
  }),
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
            "string.email": "email must be of type Email",
            "any.required": "email is required"
        }),
  roomNumber: Joi.number().required().messages({
      'string.empty': 'Le numéro de chambre est obligatoire',
      'any.required': 'Le numéro de chambre est obligatoire'
    }),
});

// Schéma pour la récupération/suppression
const emailAndRoomSchema = Joi.object({
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
    "string.email": "email must be of type Email",
    "any.required": "email is required"
}),
  roomNumber: Joi.number().required().messages({
      'string.empty': 'Le numéro de chambre est obligatoire',
      'any.required': 'Le numéro de chambre est obligatoire'
    })
});

module.exports = {
  createSchema,
  emailAndRoomSchema
};