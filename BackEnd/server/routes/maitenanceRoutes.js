const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { 
    roomNumberSchema,
    createSchema,
    updateSchema
} = require('../validation/maintenanceValidation');
const validate = require('../middlewares/validation.middleware');

// GET all maintenance records
router.get('/',maintenanceController.getAllMaintenance);

// GET specific maintenance by room number
router.get('/:roomNumber',validate(roomNumberSchema, 'params'),maintenanceController.getMaintenanceByroomNb
);

// CREATE new maintenance record
router.post('/', validate(createSchema),maintenanceController.createMaintenance
);

// UPDATE maintenance record
router.put('/:roomNumber',validate(updateSchema),maintenanceController.updateMaintenance
);

// DELETE maintenance record
router.delete('/:roomNumber',validate(roomNumberSchema, 'params'),maintenanceController.deleteMaintenance
);

module.exports = router;