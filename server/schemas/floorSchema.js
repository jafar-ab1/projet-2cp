const Joi = require('joi');

export const getByFloorNbSchema = Joi.object({
  floorNb: Joi.number().integer().min(1).required(),
});

export const createFloorSchema = Joi.object({
  floorNumber: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('actif', 'inactif', 'en maintenance').required(), 
});

export const updateFloorSchema = Joi.object({
  floorNumber: Joi.number().integer().min(1).optional(), 
  status: Joi.string().valid('actif', 'inactif', 'en maintenance').optional(), 
});


export const deleteFloorSchema = Joi.object({
  floorNb: Joi.number().integer().min(1).required(),
});
