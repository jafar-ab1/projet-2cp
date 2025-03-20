const Joi = require('joi');


export const getByRoomNbSchema = Joi.object({
  roomNumber: Joi.number().integer().min(1).required(), 
});


export const createMaintenanceSchema = Joi.object({
  roomNumber: Joi.number().integer().min(1).required(), 
  issueDescription: Joi.string().min(1).max(1500).required(), 
  userId: Joi.string().required(), 
  status: Joi.string().valid('pending', 'in-progress', 'resolved').required(), 
  resolutionDate: Joi.date().iso().greater('now').required(), 
});


export const updateMaintenanceSchema = Joi.object({
  roomNumber: Joi.number().integer().min(1).optional(), 
  issueDescription: Joi.string().min(1).max(1500).optional(), 
  userId: Joi.string().optional(), 
  status: Joi.string().valid('pending', 'in-progress', 'resolved').optional(), 
  resolutionDate: Joi.date().iso().greater('now').optional(),
});


export const deleteMaintenanceSchema = Joi.object({
  roomNumber: Joi.number().integer().min(1).required(), 
});
