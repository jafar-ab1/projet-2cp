const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsControl');

// Récupérer les paramètres globaux
router.get('/', settingsController.getSettings);

// Mettre à jour les paramètres globaux
router.put('/', settingsController.updateSettings);

module.exports = router;