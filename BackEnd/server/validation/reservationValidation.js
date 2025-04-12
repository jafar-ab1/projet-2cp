const Joi = require('joi');

// Schéma pour les paramètres d'URL
const idSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID invalide',
    'string.length': 'ID doit contenir 24 caractères',
    'any.required': 'ID est requis'
  })
});

// Schéma pour la création
const createSchema = Joi.object({
  userId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID client invalide',
    'string.length': 'ID client doit contenir 24 caractères',
    'any.required': 'ID client est requis'
  }),
  roomId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID chambre invalide',
    'string.length': 'ID chambre doit contenir 24 caractères',
    'any.required': 'ID chambre est requis'
  }),
  checkInDate: Joi.date().greater('now').required().messages({
    'date.base': 'Date invalide',
    'date.greater': 'La date d\'arrivée doit être dans le futur',
    'any.required': 'Date d\'arrivée est requise'
  }),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required().messages({
    'date.base': 'Date invalide',
    'date.greater': 'La date de départ doit être après la date d\'arrivée',
    'any.required': 'Date de départ est requise'
  }),
  totalPrice: Joi.number().positive().required().messages({
    'number.base': 'Doit être un nombre',
    'number.positive': 'Doit être positif',
    'any.required': 'Prix total est requis'
  }),
  status: Joi.string().valid("pending", "confirmed", "cancelled").default('en attente').messages({
    'any.only': 'Statut invalide'
  })
});

// Schéma pour la mise à jour
const updateSchema = Joi.object({
    userId: Joi.string().hex().length(24).messages({
        'string.hex': 'ID client invalide',
        'string.length': 'ID client doit contenir 24 caractères',
        'any.required': 'ID client est requis'
      }),
      roomId: Joi.string().hex().length(24).messages({
        'string.hex': 'ID chambre invalide',
        'string.length': 'ID chambre doit contenir 24 caractères',
        'any.required': 'ID chambre est requis'
      }),
  checkInDate: Joi.date().greater('now').messages({
    'date.base': 'Date invalide',
    'date.greater': 'Doit être dans le futur'
  }),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).messages({
    'date.base': 'Date invalide',
    'date.greater': 'Doit être après la date d\'arrivée'
  }),
  totalPrice: Joi.number().positive().messages({
    'number.base': 'Doit être un nombre',
    'number.positive': 'Doit être positif'
  }),
  status: Joi.string().valid("pending", "confirmed", "cancelled")
}).or('checkInDate', 'checkOutDate', 'totalPrice', 'status').messages({
  'object.missing': 'Au moins un champ doit être fourni'
}).min(1);

module.exports = {
  idSchema,
  createSchema,
  updateSchema
};