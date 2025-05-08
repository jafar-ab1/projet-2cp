const Joi = require('joi');

const addGuest = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
              "string.email": "email must be of type Email",
              "any.required": "email is required"
          }),
    roomNumber: Joi.string().required().alphanum().messages({
            'any.required': 'Le numéro de chambre est obligatoire'
            })
})

module.exports = {addGuest};