const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealControl');
const { createDealSchema, deleteDealSchema } = require('../validation/dealValidation');
const validate = require('../middlewares/validation.middleware');

// Récupérer tous les deals
router.get('/', dealController.getAllDeals);

// Récupérer un deal par son nom
router.get('/:dealName', dealController.getDealByName);

// Créer un nouveau deal
router.post('/', validate(createDealSchema), dealController.createDeal);

// Supprimer un deal
router.delete('/:dealName', validate(deleteDealSchema), dealController.deleteDeal);

module.exports = router;