const Joi = require('joi');

// Schéma pour les paramètres d'URL
const userIdSchema = Joi.object({
  userId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID client invalide',
    'string.length': 'ID client doit contenir 24 caractères',
    'any.required': 'ID client est requis dans l\'URL'
  })
});

// Schéma pour la création de paiement
const createPaymentSchema = Joi.object({
  userId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID client invalide',
    'string.length': 'ID client doit contenir 24 caractères',
    'any.required': 'ID client est requis dans l\'URL'
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'Le montant doit être un nombre',
    'number.positive': 'Le montant doit être positif',
    'any.required': 'Le montant est obligatoire'
  }),
  paymentDate: Joi.date().required().messages({
    'date.base': 'Date de paiement invalide',
    'any.required': 'La date de paiement est obligatoire'
  }),
  paymentMethod: Joi.string().valid("credit_card", "paypal", "cash").required().messages({
    'any.only': 'Méthode de paiement invalide',
    'any.required': 'La méthode de paiement est obligatoire'
  })
});

module.exports = {
  userIdSchema,
  createPaymentSchema
};