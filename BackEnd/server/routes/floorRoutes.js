const express = require('express');
const router = express.Router();
const floorController= require ('../controllers/floorControl');
const validate = require('../middlewares/validation.middleware.js');
const {floorNumberSchema, createFloorSchema, updateFloorSchema, statusSchema} = require('../validation/floorValidation')

router.get('/', floorController.getAllFloors);

router.get('/:floorNumber',[validate(floorNumberSchema, 'params')], floorController.getFloorByFloorNb);

router.post('/',[validate(createFloorSchema)], floorController.createFloor);

router.put('/:floorNumber', validate(updateFloorSchema),floorController.updateFloor);

router.delete('/:floorNumber',[validate(floorNumberSchema, 'params')], floorController.deleteFloor);

module.exports = router;