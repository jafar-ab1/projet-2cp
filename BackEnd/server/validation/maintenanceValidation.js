const Joi = require('joi');

// Schéma pour les paramètres d'URL
const roomNumberSchema = Joi.object({
  roomNumber: Joi.number().required().messages({
    'string.empty': 'Le numéro de chambre est obligatoire',
    'any.required': 'Le paramètre roomNumber est requis dans l\'URL'
  })
});

// Schéma pour la création
const createSchema = Joi.object({
  roomNumber: Joi.number().required().messages({
    'string.empty': 'Le numéro de chambre ne peut pas être vide',
    'any.required': 'Le champ roomNumber est obligatoire'
  }),
  issueDescription: Joi.string().min(10).required().messages({
    'string.empty': 'La description du problème ne peut pas être vide',
    'string.min': 'La description doit contenir au moins 10 caractères',
    'any.required': 'La description du problème est obligatoire'
  }),
  userId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID utilisateur invalide',
    'string.length': 'ID utilisateur doit contenir 24 caractères',
    'any.required': 'ID utilisateur est requis'
  }),
  status: Joi.string().valid("in-progress", "completed").default('pending').messages({
    'any.only': 'Le statut doit être pending, in-progress ou completed'
  }),
  resolutionDate: Joi.date().greater('now').allow(null).messages({
    'date.base': 'Date de résolution invalide',
    'date.greater': 'La date de résolution doit être dans le futur'
  })
});

// Schéma pour la mise à jour
const updateSchema = Joi.object({
  roomNumber: Joi.number().messages({
    'string.empty': 'Le numéro de chambre ne peut pas être vide'
  }),
  issueDescription: Joi.string().min(10).messages({
    'string.empty': 'La description du problème ne peut pas être vide',
    'string.min': 'La description doit contenir au moins 10 caractères'
  }),
  status: Joi.string().valid("in-progress", "completed"),
  resolutionDate: Joi.date().greater('now').allow(null)
}).or('roomNumber', 'issueDescription', 'status', 'resolutionDate').messages({
  'object.missing': 'Au moins un champ doit être fourni pour la mise à jour'
});

module.exports = {
  roomNumberSchema,
  createSchema,
  updateSchema
};