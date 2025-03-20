const Joi = require('joi');


export const createCleaningSchema = Joi.object({
  roomNumber: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('clean', 'dirty', 'in-progress').required(),
  lastCleaned: Joi.date().iso().required(),
  nextCleaning: Joi.date().iso().greater(Joi.ref('lastCleaned')).required(),
});


export const deleteCleaningSchema = Joi.object({
  roomNumber: Joi.number().integer().min(1).required(),
});


export const getByRoomNbSchema = Joi.object({
  roomNumber: Joi.number().integer().min(1).required(),
});

