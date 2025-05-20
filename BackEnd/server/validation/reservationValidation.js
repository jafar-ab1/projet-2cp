const Joi = require('joi');

// Schéma pour les paramètres d'URL
const emailSchema = Joi.object({
   email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
            "string.email": "email must be of type Email",
            "any.required": "email is required"
        })
});

const emailAndRoomNumberSchema = Joi.object({
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).required().messages({
    "string.email": "email must be of type Email",
    "any.required": "email is required"
}), 
roomNumber: Joi.array()
        .items(
          Joi.string().required().alphanum().messages({
                  'any.required': 'Le numéro de chambre est obligatoire'
                  })
        )
        .min(1)
        .required()
        .messages({
          'array.base': 'Doit être un tableau',
          'array.min': 'Au moins une chambre doit être spécifiée',
          'any.required': 'Chambre(s) est/sont requise(s)'
        })

})

// Schéma pour la création
const createSchema = Joi.object({
  checkInDate: Joi.date().required().messages({
    'date.base': 'Date invalide',
    'date.greater': 'La date d\'arrivée doit être dans le futur',
    'any.required': 'Date d\'arrivée est requise'
  }),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required().messages({
    'date.base': 'Date invalide',
    'date.greater': 'La date de départ doit être après la date d\'arrivée',
    'any.required': 'Date de départ est requise'
  }),
  roomsRequested: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('Standard', 'Deluxe', 'Suite').required()
        .messages({
          'string.base': 'Le type de chambre doit être une chaîne de caractères',
          'any.only': 'Le type de chambre doit être Standard, Deluxe ou Suite',
          'any.required': 'Le type de chambre est obligatoire'
        }),
      quantity: Joi.number().integer().min(1).max(10).required()
        .messages({
          'number.base': 'La quantité doit être un nombre',
          'number.integer': 'La quantité doit être un entier',
          'number.min': 'La quantité doit être au moins 1',
          'number.max': 'La quantité ne peut pas dépasser 10',
          'any.required': 'La quantité est obligatoire'
        })
    })
  ).min(1).required()
    .messages({
      'array.base': 'Les chambres demandées doivent être un tableau',
      'array.min': 'Au moins une chambre doit être demandée',
      'any.required': 'Les chambres demandées sont obligatoires'
    })
});

// Schéma pour la mise à jour
const updateSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net','org','fr','dz']}}).messages({
              "string.email": "email must be of type Email",
              "any.required": "email is required"
          }),
    roomNumber: Joi.array()
    .items(
      Joi.string().required().alphanum().messages({
              'any.required': 'Le numéro de chambre est obligatoire'
              })
    )
    .min(1)
    .messages({
      'array.base': 'Doit être un tableau',
      'array.min': 'Au moins une chambre doit être spécifiée',
      'any.required': 'Chambre(s) est/sont requise(s)'
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
  status: Joi.string().valid("Due in", "Checked out", "Due out", "Checked in")
}).or('checkInDate', 'checkOutDate', 'totalPrice', 'status').messages({
  'object.missing': 'Au moins un champ doit être fourni'
}).min(1);

const ReservationRoomSchema = Joi.object({
  checkInDate: Joi.date().required().messages({
    'date.base': 'Date invalide',
    'date.greater': 'Doit être dans le futur'
  }),
  checkOutDate: Joi.date().required().greater(Joi.ref('checkInDate')).messages({
    'date.base': 'Date invalide',
    'date.greater': 'Doit être après la date d\'arrivée'
  })
})

module.exports = {
  emailSchema,
  createSchema,
  updateSchema, 
  emailAndRoomNumberSchema,
  ReservationRoomSchema
};