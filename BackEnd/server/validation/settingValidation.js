const Joi = require('joi');

const settingsSchema = Joi.object({
  hotelName: Joi.string().required().min(3).max(100)
    .messages({
      'string.empty': 'Le nom de l\'hôtel est obligatoire',
      'string.min': 'Le nom de l\'hôtel doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom de l\'hôtel ne doit pas dépasser {#limit} caractères'
    }),
  totalRooms: Joi.number().integer().min(1).max(1000).required()
    .messages({
      'number.base': 'Le nombre de chambres doit être un nombre',
      'number.min': 'L\'hôtel doit avoir au moins {#limit} chambre',
      'number.max': 'L\'hôtel ne peut pas avoir plus de {#limit} chambres'
    }),
  defaultRates: Joi.object({
    standard: Joi.number().min(0).required(),
    deluxe: Joi.number().min(0).required(),
    suite: Joi.number().min(0).required()
  }).required(),
  contactEmail: Joi.string().email().required()
    .messages({
      'string.email': 'L\'email doit être une adresse valide'
    }),
  contactPhone: Joi.string().pattern(/^[0-9]{10,15}$/).required()
    .messages({
      'string.pattern.base': 'Le téléphone doit contenir entre 10 et 15 chiffres'
    })
});


module.exports = { settingsSchema
 };