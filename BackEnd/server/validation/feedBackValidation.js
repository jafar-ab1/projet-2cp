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
  userId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID utilisateur invalide',
    'string.length': 'ID utilisateur doit avoir 24 caractères',
    'any.required': 'ID utilisateur est requis'
  }),
  roomId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID chambre invalide',
    'string.length': 'ID chambre doit avoir 24 caractères',
    'any.required': 'ID chambre est requise'
  })
});

// Schéma pour la récupération/suppression
const idSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  roomId: Joi.string().hex().length(24).required()
}).messages({
  'any.required': 'Les IDs utilisateur et chambre sont requis'
});

module.exports = {
  createSchema,
  idSchema
};