const Joi = require('joi');

const branchValidationSchema = Joi.object({
    name: Joi.string().valid("Alger", "Anaba", "Oran").required(),
    location: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
    // Vous pouvez ajouter une validation plus spécifique pour le téléphone si nécessaire
    // par exemple: .pattern(/^[0-9]{10}$/) pour un numéro à 10 chiffres
});

const nameValidation = Joi.object({
    name: Joi.string().valid("Alger", "Anaba", "Oran").required()
})

module.exports ={ 
    branchValidationSchema,
    nameValidation
};