const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsControl');
const validate = require('../middlewares/validation.middleware');
const settingScehma = require('../validation/settingValidation');

// Récupérer les paramètres globaux
router.get('/', settingsController.getSettings);

router.post('/',validate(settingScehma.settingsSchema), settingsController.createSettings);

// Mettre à jour les paramètres globaux
router.put('/:hotelName', settingsController.updateSettings);

module.exports = router;