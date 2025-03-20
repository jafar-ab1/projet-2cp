// validation.js
import Joi from 'joi';


export const findByIdSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'L\'ID de la chambre est requis',
    'any.required': 'L\'ID de la chambre est requis',
  }),
});


export const findByTypeSchema = Joi.object({
  type: Joi.string().required().messages({
    'string.empty': 'Le type de chambre est requis',
    'any.required': 'Le type de chambre est requis',
  }),
});


export const createRoomSchema = Joi.object({
  roomNumber: Joi.string().required().messages({
    'string.empty': 'Le numéro de chambre est requis',
    'any.required': 'Le numéro de chambre est requis',
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Le type de chambre est requis',
    'any.required': 'Le type de chambre est requis',
  }),
  status: Joi.string().valid('disponible', 'occupée', 'en nettoyage').required().messages({
    'string.empty': 'Le statut de la chambre est requis',
    'any.only': 'Le statut doit être "disponible", "occupée" ou "en nettoyage"',
    'any.required': 'Le statut de la chambre est requis',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Le prix doit être un nombre',
    'number.positive': 'Le prix doit être positif',
    'any.required': 'Le prix est requis',
  }),
  floor: Joi.number().integer().min(0).required().messages({
    'number.base': 'L\'étage doit être un nombre entier',
    'number.min': 'L\'étage doit être positif',
    'any.required': 'L\'étage est requis',
  }),
});


export const updateRoomSchema = Joi.object({
  roomNumber: Joi.string().optional().messages({
    'string.empty': 'Le numéro de chambre ne peut pas être vide',
  }),
  type: Joi.string().optional().messages({
    'string.empty': 'Le type de chambre ne peut pas être vide',
  }),
  status: Joi.string().valid('disponible', 'occupée', 'en nettoyage').optional().messages({
    'string.empty': 'Le statut ne peut pas être vide',
    'any.only': 'Le statut doit être "disponible", "occupée" ou "en nettoyage"',
  }),
  price: Joi.number().positive().optional().messages({
    'number.base': 'Le prix doit être un nombre',
    'number.positive': 'Le prix doit être positif',
  }),
  floor: Joi.number().integer().min(0).optional().messages({
    'number.base': 'L\'étage doit être un nombre entier',
    'number.min': 'L\'étage doit être positif',
  }),
});