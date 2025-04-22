const Joi = require('joi');

const floorNumberSchema = Joi.object({
  roomNumber: Joi.string().required().alphanum().messages({
          'any.required': 'Le numéro de chambre est obligatoire'
          })
});

const createFloorSchema = Joi.object({
  roomNumber: Joi.string().required().alphanum().messages({
          'any.required': 'Le numéro de chambre est obligatoire'
          }),
  status: Joi.string().valid('Complété', 'À compléter').default('actif').messages({
    'any.only': 'Le statut doit être actif, inactif ou maintenance'
  })
});

const updateFloorSchema = Joi.object({
  roomNumber: Joi.string().required().alphanum().messages({
          'any.required': 'Le numéro de chambre est obligatoire'
          }),
  status: Joi.string().valid('Complété', 'À compléter').messages({
    'any.only': 'Le statut doit être Complété, À compléter'
  })
}).or('floorNumber', 'status'); 

const statusSchema = Joi.object({
  status: Joi.string().valid('Complété', 'À compléter').messages({
    'any.only': 'Le statut doit être actif, inactif ou maintenance'
  })
})


module.exports = {
  floorNumberSchema,
  createFloorSchema,
  updateFloorSchema,
  statusSchema
};