import Joi from 'joi';


export const guestIdSchema = Joi.object({
  guestId: Joi.string().required().messages({
    'string.empty': 'L\'ID du client est requis',
    'any.required': 'L\'ID du client est requis',
  }),
});


export const createPaymentSchema = Joi.object({
  reservation: Joi.string().required().messages({
    'string.empty': 'La réservation est requise',
    'any.required': 'La réservation est requise',
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'Le montant doit être un nombre',
    'number.positive': 'Le montant doit être positif',
    'any.required': 'Le montant est requis',
  }),
  paymentDate: Joi.date().iso().required().messages({
    'date.base': 'La date de paiement doit être une date valide',
    'any.required': 'La date de paiement est requise',
  }),
  paymentMethod: Joi.string().required().messages({
    'string.empty': 'La méthode de paiement est requise',
    'any.required': 'La méthode de paiement est requise',
  }),
});

