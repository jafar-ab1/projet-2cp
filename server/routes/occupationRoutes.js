const express = require('express');
const router = express.Router();
const occupancyController = require('../controllers/occupationControl');

// Récupérer toutes les statistiques d'occupation
router.get('/', occupancyController.getAllOccupancies);

// Récupérer une statistique d'occupation par son ID
router.get('/', occupancyController.getOccupancyByMonth);

// Ajouter une nouvelle statistique d'occupation
router.post('/', occupancyController.createOccupancy);

// Mettre à jour une statistique d'occupation
router.put('/', occupancyController.updateOccupancy);

// Supprimer une statistique d'occupation
router.delete('/', occupancyController.deleteOccupancy);

module.exports = router;