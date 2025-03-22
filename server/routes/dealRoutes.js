import express from 'express';

import Deal from '../models/Deal.js';
import DealService from '../services/dealService.js';
import  DealController from '../controllers/dealControl.js';

const dealService = new DealService(Deal);
const dealController = new DealController(dealService);

const router = express.Router();

// Récupérer tous les deals
router.get('/', dealController.getAll);

// Récupérer un deal par son nom
router.get('/:dealName', dealController.getByName);

// Créer un nouveau deal
router.post('/', dealController.create);

// Supprimer un deal
router.delete('/:dealName', dealController.delete);

export default router;