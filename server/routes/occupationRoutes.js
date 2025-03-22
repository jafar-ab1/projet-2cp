import express from 'express';

import Occupation from '../models/Occupation.js';
import OccupationService from '../services/occupationService.js';
import OccupancyController from'../controllers/occupationControl.js';

const occupationService = new OccupationService(Occupation);
const occupationController = new OccupancyController(occupationService);

const router = express.Router();

// Récupérer toutes les statistiques d'occupation
router.get('/', occupationController.getAll);

// Récupérer une statistique d'occupation par son ID
router.get('/', occupationController.getByMonth);

// Ajouter une nouvelle statistique d'occupation
router.post('/', occupationController.create);

// Mettre à jour une statistique d'occupation
router.put('/', occupationController.update);

// Supprimer une statistique d'occupation
router.delete('/', occupationController.delete);

export default router;