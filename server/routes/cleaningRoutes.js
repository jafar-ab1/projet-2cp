import express from 'express';

import Cleaning from '../models/Cleaning.js';
import CleaningService from '../services/cleaningService.js';
import CleaningController from'../controllers/cleaningControl.js';

const cleaningService = new CleaningService(Cleaning);
const cleaningController = new CleaningController(cleaningService);

const router = express.Router();

// Récupérer toutes les opérations de nettoyage
router.get('/', cleaningController.getAll);

// Récupérer une opération de nettoyage par numéro de chambre
router.get('/:roomNumber', cleaningController.getByRoomNb);

// Créer une nouvelle opération de nettoyage
router.post('/', cleaningController.create);

// Supprimer une opération de nettoyage
router.delete('/', cleaningController.delete);

export default router;