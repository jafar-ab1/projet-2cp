const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealControl');
const { createDealSchema, deleteDealSchema, statusSchema } = require('../validation/dealValidation');
const validate = require('../middlewares/validation.middleware');

// Récupérer tous les deals
router.get('/', dealController.getAllDeals);

// Récupérer un deal par son nom
router.get('/:dealName', validate(deleteDealSchema, 'params'),dealController.getDealByName);

router.get('/status/:status', validate(statusSchema, 'params'), dealController.getDealByStatus);

// Créer un nouveau deal
router.post('/', validate(createDealSchema), dealController.createDeal);

// Supprimer un deal
router.delete('/:dealName', validate(deleteDealSchema, 'params'), dealController.deleteDeal);

module.exports = router;