import Joi from 'joi';


export const getByMonthSchema = Joi.object({
    month: Joi.string().required().messages({
        'string.empty': 'Le mois est requis',
        'any.required': 'Le mois est requis',
      }),
});

export const createOccupancySchema = Joi.object({
  month: Joi.string().required().messages({
    'string.empty': 'Le mois est requis',
    'any.required': 'Le mois est requis',
  }),
  occupancyRate: Joi.number().required().messages({
    'number.base': 'Le taux d\'occupation doit être un nombre',
    'any.required': 'Le taux d\'occupation est requis',
  }),
  totalRooms: Joi.number().integer().min(0).required().messages({
    'number.base': 'Le nombre total de chambres doit être un entier',
    'number.min': 'Le nombre total de chambres doit être positif',
    'any.required': 'Le nombre total de chambres est requis',
  }),
  occupiedRooms: Joi.number().integer().min(0).required().messages({
    'number.base': 'Le nombre de chambres occupées doit être un entier',
    'number.min': 'Le nombre de chambres occupées doit être positif',
    'any.required': 'Le nombre de chambres occupées est requis',
  }),
  availableRooms: Joi.number().integer().min(0).required().messages({
    'number.base': 'Le nombre de chambres disponibles doit être un entier',
    'number.min': 'Le nombre de chambres disponibles doit être positif',
    'any.required': 'Le nombre de chambres disponibles est requis',
  }),
});


export const updateOccupancySchema = Joi.object({
  month: Joi.string().optional().messages({
    'string.empty': 'Le mois ne peut pas être vide',
  }),
  occupancyRate: Joi.number().optional().messages({
    'number.base': 'Le taux d\'occupation doit être un nombre',
  }),
  totalRooms: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Le nombre total de chambres doit être un entier',
    'number.min': 'Le nombre total de chambres doit être positif',
  }),
  occupiedRooms: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Le nombre de chambres occupées doit être un entier',
    'number.min': 'Le nombre de chambres occupées doit être positif',
  }),
  availableRooms: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Le nombre de chambres disponibles doit être un entier',
    'number.min': 'Le nombre de chambres disponibles doit être positif',
  }),
});

export const deleteSchema = Joi.object({
    month: Joi.string().required().messages({
        'string.empty': 'Le mois est requis',
        'any.required': 'Le mois est requis',
      }),
});
