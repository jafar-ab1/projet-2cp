const Joi = require('joi');

const tarifSchema = Joi.object({
  roomType: Joi.string().required().valid("Standard", "Deluxe", "Suite"),
  price: Joi.number().positive().required(),
});

const tarifUpdateSchema = Joi.object({
  roomType: Joi.string().optional().valid("Standard", "Deluxe", "Suite"),
  price: Joi.number().positive().optional(),
}).or('roomType', 'price'); // au moins un champ requis

const getTarif = Joi.object({
  roomType: Joi.string().required().valid("Standard", "Deluxe", "Suite")
})


module.exports = {
  tarifSchema,
  tarifUpdateSchema,
  getTarif
};
