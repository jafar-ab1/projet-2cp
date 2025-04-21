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
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
            "string.email": "email must be of type Email",
            "any.required": "email is required"
        }),
  status: Joi.string().valid("In-progress", "Completed").default('In-progress').messages({
    'any.only': 'Le statut doit être in-progress ou completed'
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
  status: Joi.string().valid("In-progress", "Completed"),
  resolutionDate: Joi.date().greater('now').allow(null)
}).or('roomNumber', 'issueDescription', 'status', 'resolutionDate').messages({
  'object.missing': 'Au moins un champ doit être fourni pour la mise à jour'
});

module.exports = {
  roomNumberSchema,
  createSchema,
  updateSchema
};