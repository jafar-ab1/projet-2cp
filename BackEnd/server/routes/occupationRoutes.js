const express = require('express');
const router = express.Router();
const occupancyController = require('../controllers/occupationControl');
const validate = require('../middlewares/validation.middleware');
const {monthSchema,
    createSchema,
    updateSchema} = require('../validation/occupationValidation');


router.get('/', occupancyController.getAllOccupancies);


router.get('/:month', validate(monthSchema, 'params'), occupancyController.getOccupancyByMonth);


router.post('/',validate(createSchema), occupancyController.createOccupancy);


router.put('/:month', validate(updateSchema), validate(monthSchema, 'params'), occupancyController.updateOccupancy);


router.delete('/:month', validate(monthSchema, 'params'),occupancyController.deleteOccupancy);

module.exports = router;