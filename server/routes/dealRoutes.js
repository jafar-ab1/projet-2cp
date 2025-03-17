const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealControl');

// Récupérer tous les deals
router.get('/', dealController.getAllDeals);

// Récupérer un deal par son nom
router.get('/:dealName', dealController.getDealByName);

// Créer un nouveau deal
router.post('/', dealController.createDeal);

// Supprimer un deal
router.delete('/:dealName', dealController.suppFeed_back);

module.exports = router;