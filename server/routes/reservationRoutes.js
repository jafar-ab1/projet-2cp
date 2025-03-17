const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reserveControl');

// Récupérer toutes les réservations
router.get('/', reservationController.getAllReservations);

// Récupérer une réservation par son ID
router.get('/:id', reservationController.getReservationById);

// Ajouter une nouvelle réservation
router.post('/', reservationController.creatReservation);

// Mettre à jour une réservation
router.put('/:id', reservationController.modifyReservation);

// Supprimer une réservation
router.delete('/:id', reservationController.suppReservation);

module.exports = router;