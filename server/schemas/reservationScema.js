import Joi from 'joi';


export const reservationIdSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'L\'ID de la réservation est requis',
    'any.required': 'L\'ID de la réservation est requis',
  }),
});


export const createReservationSchema = Joi.object({
  checkInDate: Joi.date().required().messages({
    'date.base': 'La date d\'arrivée doit être une date valide',
    'any.required': 'La date d\'arrivée est requise',
  }),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required().messages({
    'date.base': 'La date de départ doit être une date valide',
    'date.greater': 'La date de départ doit être postérieure à la date d\'arrivée',
    'any.required': 'La date de départ est requise',
  }),
  totalPrice: Joi.number().positive().required().messages({
    'number.base': 'Le prix total doit être un nombre',
    'number.positive': 'Le prix total doit être positif',
    'any.required': 'Le prix total est requis',
  }),
  status: Joi.string().valid('confirmed', 'pending', 'cancelled').required().messages({
    'string.empty': 'Le statut est requis',
    'any.only': 'Le statut doit être "confirmed", "pending" ou "cancelled"',
    'any.required': 'Le statut est requis',
  }),
});


export const updateReservationSchema = Joi.object({
  checkInDate: Joi.date().optional().messages({
    'date.base': 'La date d\'arrivée doit être une date valide',
  }),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).optional().messages({
    'date.base': 'La date de départ doit être une date valide',
    'date.greater': 'La date de départ doit être postérieure à la date d\'arrivée',
  }),
  totalPrice: Joi.number().positive().optional().messages({
    'number.base': 'Le prix total doit être un nombre',
    'number.positive': 'Le prix total doit être positif',
  }),
  status: Joi.string().valid('confirmed', 'pending', 'cancelled').optional().messages({
    'string.empty': 'Le statut ne peut pas être vide',
    'any.only': 'Le statut doit être "confirmed", "pending" ou "cancelled"',
  }),
});
