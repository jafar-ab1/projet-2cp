const Joi = require('joi');

// Schéma pour la création
const createCleaningSchema = Joi.object({
  roomNumber: Joi.number().required().messages({
    'any.required': 'Le numéro de chambre est obligatoire',
    'string.empty': 'Le numéro de chambre ne peut pas être vide'
  }),
  status: Joi.string().required().messages({
    'any.required': 'Le statut est obligatoire',
    'string.empty': 'Le statut ne peut pas être vide'
  }),
  lastCleaned: Joi.date().required().messages({
    'any.required': 'La date de dernier nettoyage est obligatoire',
    'date.base': 'Doit être une date valide'
  }),
  nextCleaning: Joi.date().required().messages({
    'any.required': 'La date de prochain nettoyage est obligatoire',
    'date.base': 'Doit être une date valide'
  })
});


const deleteCleaningSchema = Joi.object({
  roomNumber: Joi.number().required().messages({
    'any.required': 'Le numéro de chambre est obligatoire pour la suppression'
  })
});

module.exports = {
  createCleaningSchema,
  deleteCleaningSchema
};