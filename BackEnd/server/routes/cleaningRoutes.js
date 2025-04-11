const express = require('express');
const router = express.Router();
const cleaningController = require('../controllers/cleaningControl');
const { createCleaningSchema, deleteCleaningSchema } = require('../validation/cleaningValidation');
const validate = require('../middealwear/validation.midellwear');

// Récupérer toutes les opérations de nettoyage
router.get('/', cleaningController.getAllCleaning);

// Récupérer une opération de nettoyage par numéro de chambre
router.get('/:roomNumber', cleaningController.getCleaningByRoomNb);

// Créer une nouvelle opération de nettoyage
router.post('/', validate(createCleaningSchema), cleaningController.createCleaning);

// Supprimer une opération de nettoyage
router.delete('/:roomNumber', validate(deleteCleaningSchema),  cleaningController.suppCleaning);

module.exports = router;