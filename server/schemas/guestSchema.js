const Joi = require('joi');


export const getByIdSchema = Joi.object({
  id: Joi.string().required(), 
});


export const createGuestSchema = Joi.object({
  guestname: Joi.string().min(1).max(20).required(), 
  roomnumber: Joi.number().integer().min(1).required(), 
  checkInDate: Joi.date().iso().required(), 
  checkOutDate: Joi.date().iso().greater(Joi.ref('checkInDate')).required(), 
  feedback: Joi.string().max(1500).optional(), 
});


export const updateGuestSchema = Joi.object({
  guestname: Joi.string().min(1).max(20).optional(), 
  roomnumber: Joi.number().integer().min(1).optional(), 
  checkInDate: Joi.date().iso().optional(), 
  checkOutDate: Joi.date().iso().greater(Joi.ref('checkInDate')).optional(), 
  feedback: Joi.string().max(1500).optional(), 
});


export const deleteGuestSchema = Joi.object({
  id: Joi.string().required(), 
});
