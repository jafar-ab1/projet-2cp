const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const validateBranch = require('../validation/branchValidation'); 
const validate = require('../middlewares/validation.middleware');

// Créer une nouvelle branche
router.post('/', validate(validateBranch.branchValidationSchema), branchController.createBranch);

// Obtenir toutes les branches
router.get('/', branchController.getAllBranches);

// Obtenir une branche par son nom
router.get('/:name',validate(validateBranch.nameValidation, 'params') ,branchController.getBranchByName);

// Mettre à jour une branche
router.put('/:name',validate(validateBranch.nameValidation, 'params'), branchController.updateBranch);

// Supprimer une branche
router.delete('/:name',validate(validateBranch.nameValidation, 'params'), branchController.deleteBranch);

module.exports = router;