const express = require('express');
const router = express.Router();
const cleaningController = require('../controllers/cleaningControl');

// Récupérer toutes les opérations de nettoyage
router.get('/', cleaningController.getAllDeals);

// Récupérer une opération de nettoyage par numéro de chambre
router.get('/:roomNumber', cleaningController.getCleaningByRoomNb);

// Créer une nouvelle opération de nettoyage
router.post('/', cleaningController.createCleaning);

// Supprimer une opération de nettoyage
router.delete('/', cleaningController.suppCleaning);

module.exports = router;