const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reserveControl');
const validate = require('../middlewares/validation.middleware');
const { idSchema,
  createSchema,
  updateSchema} = require('../validation/reservationValidation');

// Récupérer toutes les réservations
router.get('/', reservationController.getAllReservations);

// Récupérer une réservation par son ID
router.get('/:id',validate(idSchema, 'params'), reservationController.getReservationById);

// Ajouter une nouvelle réservation
router.post('/',validate(createSchema), reservationController.creatReservation);

// Mettre à jour une réservation
router.put('/:id',validate(updateSchema), reservationController.modifyReservation);

// Supprimer une réservation
router.delete('/:id',validate(idSchema, 'params'), reservationController.suppReservation);

module.exports = router;