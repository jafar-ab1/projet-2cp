const Joi = require('joi');

const floorNumberSchema = Joi.object({
  floorNumber: Joi.number().required().messages({
    'string.empty': 'Le numéro d\'étage est obligatoire',
    'any.required': 'Le paramètre floorNb est requis'
  })
});

const createFloorSchema = Joi.object({
  floorNumber: Joi.number().required().messages({
    'string.empty': 'Le numéro d\'étage est obligatoire',
    'any.required': 'Le numéro d\'étage est requis'
  }),
  status: Joi.string().valid('Complété', 'À compléter').default('actif').messages({
    'any.only': 'Le statut doit être actif, inactif ou maintenance'
  })
});

const updateFloorSchema = Joi.object({
  floorNumber: Joi.number().messages({
    'string.empty': 'Le numéro d\'étage ne peut pas être vide'
  }),
  status: Joi.string().valid('Complété', 'À compléter').messages({
    'any.only': 'Le statut doit être actif, inactif ou maintenance'
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