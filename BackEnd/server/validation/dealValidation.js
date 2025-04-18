const Joi = require('joi');

const createDealSchema = Joi.object({
  dealName: Joi.string().required().messages({
    'string.empty': 'Le nom de l\'offre est obligatoire',
    'any.required': 'Le nom de l\'offre est requis'
  }),
  reservationsLeft: Joi.number().integer().min(0).required().messages({
    'number.base': 'Le nombre de réservations doit être un nombre',
    'number.min': 'Le nombre de réservations ne peut pas être négatif',
    'any.required': 'Le nombre de réservations restantes est requis'
  }),
  endDate: Joi.date().greater('now').required().messages({
    'date.base': 'Date de fin invalide',
    'date.greater': 'La date de fin doit être dans le futur',
    'any.required': 'La date de fin est requise'
  }),
  roomType: Joi.string().valid('standard', 'deluxe', 'suite').required().messages({
    'any.only': 'Le type de chambre doit être standard, deluxe ou suite',
    'any.required': 'Le type de chambre est requis'
  }),
  status: Joi.string().valid('active', 'inactive').required().messages({
    'any.only': 'Le statut doit être active ou inactive',
    'any.required': 'Le statut est requis'
  })
});

const deleteDealSchema = Joi.object({
  dealName: Joi.string().required().messages({
    'string.empty': 'Le nom de l\'offre est obligatoire',
    'any.required': 'Le nom de l\'offre est requis'
  })
});

module.exports = {
  createDealSchema,
  deleteDealSchema
};