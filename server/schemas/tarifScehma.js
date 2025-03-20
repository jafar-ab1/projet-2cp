import Joi from 'joi';


export const tarifParamsSchema = Joi.object({
  roomType: Joi.string().required().messages({
    'string.empty': 'Le type de chambre est requis',
    'any.required': 'Le type de chambre est requis',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Le prix doit être un nombre',
    'number.positive': 'Le prix doit être positif',
    'any.required': 'Le prix est requis',
  }),
});


export const createTarifSchema = Joi.object({
  roomType: Joi.string().required().messages({
    'string.empty': 'Le type de chambre est requis',
    'any.required': 'Le type de chambre est requis',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Le prix doit être un nombre',
    'number.positive': 'Le prix doit être positif',
    'any.required': 'Le prix est requis',
  }),
});


export const updateTarifSchema = Joi.object({
  roomType: Joi.string().optional().messages({
    'string.empty': 'Le type de chambre ne peut pas être vide',
  }),
  price: Joi.number().positive().optional().messages({
    'number.base': 'Le prix doit être un nombre',
    'number.positive': 'Le prix doit être positif',
  }),
});


export const deleteTarifSchema = Joi.object({
  roomType: Joi.string().required().messages({
    'string.empty': 'Le type de chambre est requis',
    'any.required': 'Le type de chambre est requis',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Le prix doit être un nombre',
    'number.positive': 'Le prix doit être positif',
    'any.required': 'Le prix est requis',
  }),
});

