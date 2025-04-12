const Joi = require('joi');

const tarifSchema = Joi.object({
  roomType: Joi.string().required(),
  price: Joi.number().positive().required(),
});

const tarifUpdateSchema = Joi.object({
  roomType: Joi.string().optional(),
  price: Joi.number().positive().optional(),
}).or('roomType', 'price'); // au moins un champ requis


module.exports = {
  tarifSchema,
  tarifUpdateSchema
};
