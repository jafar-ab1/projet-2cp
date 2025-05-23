const Joi = require('joi');

const addGuest = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
              "string.email": "email must be of type Email",
              "any.required": "email is required"
          }),
    roomNumber: Joi.array().items(
    Joi.string().required()
      .messages({
        'any.required': 'Le numéro de chambre est obligatoire'
      })
  ).min(1).max(20).required()
    .messages({
      'array.base': 'roomNumbers doit être un tableau',
      'array.min': 'Au moins une chambre doit être fournie',
      'array.max': 'Maximum 20 chambres par requête',
      'any.required': 'roomNumber est obligatoire'
    })
});

const edditGuest = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
              "string.email": "email must be of type Email",
              "any.required": "email is required"
          }),
    roomNumber: Joi.string().required().alphanum().messages({
              'any.required': 'Le numéro de chambre est obligatoire'
              }),
    type: Joi.string().valid('Standard', 'Deluxe', 'Suite').required().messages({
        'string.empty': 'Le type de chambre est obligatoire',
        'any.required': 'Le type de chambre est obligatoire',
        'any.only': 'Le type de chambre doit être standard, deluxe ou suite'
      })
})

module.exports = {addGuest, edditGuest};