const Joi = require('joi');

// Schéma pour les paramètres d'URL
const userEmailSchema = Joi.object({
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
            "string.email": "email must be of type Email",
            "any.required": "email is required"
        }),
});

// Schéma pour la création de paiement
const createPaymentSchema = Joi.object({
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
            "string.email": "email must be of type Email",
            "any.required": "email is required"
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
  paymentMethod: Joi.string().valid("Credit_card", "Paypal", "Cash").required().messages({
    'any.only': 'Méthode de paiement invalide doit etre Credit_card, Paypal, Cash',
    'any.required': 'La méthode de paiement est obligatoire'
  })
});

module.exports = {
  userEmailSchema,
  createPaymentSchema
};