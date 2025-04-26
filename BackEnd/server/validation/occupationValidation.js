const Joi = require('joi');

const monthSchema = Joi.object({
  month: Joi.string().pattern(/^(0[1-9]|1[0-2])-(19|20)\d{2}$/).required().messages({
    'string.pattern.base': 'Le mois doit être au format MM-YYYY',
    'any.required': 'Le paramètre month est requis'
  })
});

const createSchema = Joi.object({
  month: Joi.string().pattern(/^(0[1-9]|1[0-2])-(19|20)\d{2}$/).required().messages({
    'string.pattern.base': 'Le mois doit être au format MM-YYYY',
    'any.required': 'Le mois est obligatoire'
  }),
  occupationRate: Joi.number().min(0).max(100).required().messages({
    'number.min': 'Le taux doit être entre 0 et 100',
    'number.max': 'Le taux doit être entre 0 et 100',
    'any.required': 'Le taux d\'occupation est obligatoire'
  }),
  totalRooms: Joi.number().integer().min(1).required().messages({
    'number.base': 'Doit être un nombre',
    'number.integer': 'Doit être un entier',
    'number.min': 'Doit avoir au moins 1 chambre',
    'any.required': 'Le nombre total de chambres est obligatoire'
  }),
  occupiedRooms: Joi.number().integer().min(0).required().messages({
    'number.base': 'Doit être un nombre',
    'number.integer': 'Doit être un entier',
    'number.min': 'Ne peut pas être négatif',
    'any.required': 'Le nombre de chambres occupées est obligatoire'
  }),
  availableRooms: Joi.number().integer().min(0).required().messages({
    'number.base': 'Doit être un nombre',
    'number.integer': 'Doit être un entier',
    'number.min': 'Ne peut pas être négatif',
    'any.required': 'Le nombre de chambres disponibles est obligatoire'
  })
}).custom((value, helpers) => {
  if (value.occupiedRooms + value.availableRooms !== value.totalRooms) {
    return helpers.error('any.invalid');
  }
  return value;
}).messages({
  'any.invalid': 'Les chiffres fournis sont incohérents'
});

const updateSchema = Joi.object({
  month: Joi.string().pattern(/^(0[1-9]|1[0-2])-(19|20)\d{2}$/).messages({
    'string.pattern.base': 'Le mois doit être au format MM-YYYY'
  }),
  occupationRate: Joi.number().min(0).max(100),
  totalRooms: Joi.number().integer().min(1),
  occupiedRooms: Joi.number().integer().min(0),
  availbleRooms: Joi.number().integer().min(0)
}).min(1).messages({
  'object.missing': 'Au moins un champ doit être fourni pour la mise à jour'
});

module.exports = {
  monthSchema,
  createSchema,
  updateSchema
};
