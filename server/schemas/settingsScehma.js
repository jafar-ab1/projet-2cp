import Joi from 'joi';


export const updateSettingsSchema = Joi.object({
  hotelName: Joi.string().optional().messages({
    'string.empty': 'Le nom de l\'hôtel ne peut pas être vide',
  }),
  checkInTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional().messages({
    'string.pattern.base': 'L\'heure d\'arrivée doit être au format HH:MM',
  }),
  checkOutTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional().messages({
    'string.pattern.base': 'L\'heure de départ doit être au format HH:MM',
  }),
  currency: Joi.string().length(3).optional().messages({
    'string.length': 'La devise doit être un code de 3 lettres (ex: EUR, USD)',
  }),
  taxRate: Joi.number().min(0).max(100).optional().messages({
    'number.base': 'Le taux de taxe doit être un nombre',
    'number.min': 'Le taux de taxe doit être compris entre 0 et 100',
    'number.max': 'Le taux de taxe doit être compris entre 0 et 100',
  }),
});
