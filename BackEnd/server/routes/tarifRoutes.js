const express = require('express');
const router = express.Router();
const tarifController = require('../controllers/tarifControl');
const validate = require('../middlewares/validation.middleware');
const tarifval = require('../validation/tarifValidation');


// GET all tarifs
router.get('/', tarifController.getAllTarifs);

// GET one tarif by roomType and price (passed as params)
router.get('/:roomType',validate(tarifval.getTarif, 'params'), tarifController.getTarif);

// POST create a new tarif
router.post('/',validate(tarifval.tarifSchema,), tarifController.createTarif);

// PUT update a tarif (based on roomType and price inside body)
router.put('/:roomType',validate(tarifval.tarifUpdateSchema, 'params'), tarifController.updateTarif);

// DELETE a tarif (based on roomType and price inside body)
router.delete('/:roomType',validate(tarifval.getTarif, 'params'), tarifController.deleteTarif);

module.exports = router;
