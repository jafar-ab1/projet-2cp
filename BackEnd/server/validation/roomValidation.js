const { sign } = require('crypto');
const Joi = require('joi');

const createRoomSchema = Joi.object({
  roomNumber: Joi.string().required().alphanum().messages({
          'any.required': 'Le numéro de chambre est obligatoire'
          }),
  type: Joi.string().valid('Standard', 'Deluxe', 'Suite').required().messages({
    'string.empty': 'Le type de chambre est obligatoire',
    'any.required': 'Le type de chambre est obligatoire',
    'any.only': 'Le type de chambre doit être standard, deluxe ou suite'
  }),
  status0: Joi.string().valid('Maked up', 'Not Maked up').default('Maked up').messages({
    'any.only': 'Le statut doit être Maked up, Not Maked up'
  }),
  status1: Joi.string().valid('Available', 'Occupied').default('Available').messages({
    'any.only': 'Le statut doit être Available, Occupied'
  }),
  price: Joi.number().min(0).messages({
    'number.base': 'Le prix doit être un nombre',
    'number.min': 'Le prix ne peut pas être négatif'
  }),
  floor: Joi.number().integer().min(0).required().messages({
    'number.base': 'L\'étage doit être un nombre entier',
    'number.min': 'L\'étage ne peut pas être négatif',
    'any.required': 'L\'étage est obligatoire'
  }),
  capacity: Joi.number().integer().min(1).messages({
    'number.base': 'La capacité doit être un nombre entier',
    'number.min': 'La capacité doit être au moins 1',
    'any.required': 'La capacité est obligatoire'
  }),
  size: Joi.string().min(0).messages({
    'number.base': 'La taille doit être un nombre',
    'number.min': 'La taille ne peut pas être négative',
    'any.required': 'La taille est obligatoire'
  }),
  bedType: Joi.string().messages({
    'any.required': 'Le type de lit est obligatoire'
  })
});

// Schéma de validation pour la mise à jour d'une chambre
const updateRoomSchema = Joi.object({
    roomNumber: Joi.string().optional().alphanum().messages({
            'any.required': 'Le numéro de chambre est obligatoire'
            }),
    type: Joi.string().optional().valid('Standard', 'Deluxe', 'Suite').messages({
      'any.only': 'Le type de chambre doit être Standard, Deluxe ou Suite'
    }),
    facilities: Joi.array().optional().items(Joi.string()).min(1).messages({
      'array.base': 'Les équipements doivent être une liste',
      'array.min': 'Au moins un équipement doit être spécifié'
    }),
    price: Joi.number().optional().min(0).messages({
        'number.base': 'Le prix doit être un nombre',
        'number.min': 'Le prix ne peut pas être négatif',
        'any.required': 'Le prix est obligatoire'
      }),
    status0: Joi.string().optional().valid('Maked up', 'Not Maked up'),
    status1: Joi.string().valid('Available', 'Occupied').default('Available'),
    floor: Joi.string().optional(),
    capacity: Joi.number().integer().min(1).optional().messages({
    'number.base': 'La capacité doit être un nombre entier',
    'number.min': 'La capacité doit être au moins 1',
    'any.required': 'La capacité est obligatoire'
  }),
  size: Joi.string().min(0).optional().messages({
    'number.base': 'La taille doit être un nombre',
    'number.min': 'La taille ne peut pas être négative',
    'any.required': 'La taille est obligatoire'
  }),
  bedType: Joi.string().optional().messages({
    'any.required': 'Le type de lit est obligatoire'
  })
  })
  .min(1) // Au moins un champ doit être fourni
  .messages({
    'object.min': 'Au moins un champ doit être fourni pour la mise à jour'
  })
  .options({ allowUnknown: false });


const roomTypeSchema = Joi.object({
  type: Joi.string().valid('Standard', 'Deluxe', 'Suite').required().messages({
    'string.empty': 'Le type de chambre est obligatoire',
    'any.required': 'Le type de chambre est obligatoire',
    'any.only':'Le type de chambre doit être Standard, Deluxe ou Suite'
  })
});

const roomNumberSchema = Joi.object({
    roomNumber: Joi.string().required().alphanum().messages({
            'any.required': 'Le numéro de chambre est obligatoire'
            })
});

const roomStatus1Schema = Joi.object({
  status1 : Joi.string().valid( 'Available', 'Occupied').required()
});

const roomTypeCountSchema = Joi.object({
  type : Joi.string().valid('Standard', 'Deluxe', 'Suite').required()
});

const roomStatus0AndStatus1CountSchema = Joi.object({
  status0 : Joi.string().valid('Maked up', 'Not Maked up').required(),
  status1 : Joi.string().valid('Available', 'Occupied' ).required()

})



module.exports = {
  createRoomSchema,
  updateRoomSchema,
  roomTypeSchema,
  roomNumberSchema,
  roomStatus1Schema,
  roomTypeCountSchema,
  roomStatus0AndStatus1CountSchema
};