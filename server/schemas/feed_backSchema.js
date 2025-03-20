const Joi = require('joi');


export const getFeedBackSchema = Joi.object({
  userId: Joi.string().required(), 
  roomId: Joi.string().required(), 
});


export const createFeedBackSchema = Joi.object({
  comment: Joi.string().min(1).max(500).required(), 
  date: Joi.date().iso().required(), 
});


export const deleteFeedBackSchema = Joi.object({
  userId: Joi.string().required(), 
  roomId: Joi.string().required(), 
});
