import express from 'express';

import Reservation from '../models/Reservation.js';
import ReservationService from '../services/reservationService.js';
import ReservationController from'../controllers/reserveControl.js';

const reservationService = new ReservationService(Reservation);
const reservationController = new ReservationController(reservationService);

const router = express.Router();

// Récupérer toutes les réservations
router.get('/', reservationController.getAll);

// Récupérer une réservation par son ID
router.get('/:id', reservationController.getById);

// Ajouter une nouvelle réservation
router.post('/', reservationController.create);

// Mettre à jour une réservation
router.put('/:id', reservationController.update);

// Supprimer une réservation
router.delete('/:id', reservationController.delete);

export default router;