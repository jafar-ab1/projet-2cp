const Joi = require('joi');

const createRoomSchema = Joi.object({
  roomNumber: Joi.number().required().messages({
    'string.empty': 'Le numéro de chambre est obligatoire',
    'any.required': 'Le numéro de chambre est obligatoire'
  }),
  type: Joi.string().valid('Standard', 'Deluxe', 'Suite').required().messages({
    'string.empty': 'Le type de chambre est obligatoire',
    'any.required': 'Le type de chambre est obligatoire',
    'any.only': 'Le type de chambre doit être standard, deluxe ou suite'
  }),
  bedType: Joi.string().valid('Simple', 'Double').required().messages({
    'string.empty': 'Le type de lit est obligatoire',
    'any.required': 'Le type de lit est obligatoire',
    'any.only': 'Le type de lit doit être Simple, Double'
  }),
  status0: Joi.string().valid('Occupied', 'Available','Dirty','Inspected').required().default('Available').messages({
    'any.only': 'Le statut doit être disponible, Occupied, Available, Dirty ou Inspected'
  }),
  status1: Joi.string().valid('Available', 'Booked','Wailtelist').required().default('Available').messages({
    'any.only': 'Le statut doit être Wailtelist, Occupied, Available'
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Le prix doit être un nombre',
    'number.min': 'Le prix ne peut pas être négatif',
    'any.required': 'Le prix est obligatoire'
  }),
  floor: Joi.number().integer().min(0).required().messages({
    'number.base': 'L\'étage doit être un nombre entier',
    'number.min': 'L\'étage ne peut pas être négatif',
    'any.required': 'L\'étage est obligatoire'
  }),

  facilities: Joi.array().items(
    Joi.string()
  ).min(1).required().messages({
    'array.base': 'Les équipements doivent être fournis sous forme de tableau',
    'array.min': 'Au moins un équipement doit être spécifié',
    'any.required': 'Les équipements sont obligatoires'
  })
});

// Schéma de validation pour la mise à jour d'une chambre
const updateRoomSchema = Joi.object({
    roomNumber: Joi.number().optional().messages({
      'number.base': 'Le numéro de chambre doit être un nombre'
    }),
    type: Joi.string().optional().valid('Standard', 'Deluxe', 'Suite').messages({
      'any.only': 'Le type de chambre doit être Standard, Deluxe ou Suite'
    }),
    bedType: Joi.string().optional().valid('Simple', 'Double').messages({
      'any.only': 'Le type de lit doit être Simple ou Double'
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
    status0: Joi.string().optional().valid('Occupied', 'Available', 'Dirty', 'Inspected', 'Clean'),
    status1: Joi.string().valid('Available', 'Booked','Wailtelist').default('Available'),
    floor: Joi.string().optional()
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
    roomNumber: Joi.number().required().messages({
       'number.base': 'Le numéro de chambre doit être un nombre',
      'number.integer': 'Le numéro de chambre doit être un entier',
      'number.positive': 'Le numéro de chambre doit être positif',
      'any.required': 'Le numéro de chambre est obligatoire'
      })
});

const roomStatus0Schema = Joi.object({
  status0 : Joi.string().valid('Occupied', 'Available','dirty','inspected' ).required()
});

const roomTypeCountSchema = Joi.object({
  type : Joi.string().valid('Standard', 'Deluxe', 'Suite').required()
});

const roomTypeAndStatus0CountSchema = Joi.object({
  type : Joi.string().valid('Standard', 'Deluxe', 'Suite').required(),
  status0 : Joi.string().valid('Occupied', 'Available','dirty','inspected' ).required()

})



module.exports = {
  createRoomSchema,
  updateRoomSchema,
  roomTypeSchema,
  roomNumberSchema,
  roomStatus0Schema,
  roomTypeCountSchema,
  roomTypeAndStatus0CountSchema
};