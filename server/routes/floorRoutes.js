const express = require('express');
const router = express.Router();
const floorController= require ('../controllers/floorControl');

router.get('/', floorController.getAllFloors);

router.get('/Floor/:floorNb', floorController.getFloorByFloorNb);

router.post('/', floorController.createFloor);

router.put('/Floor/:floorNb', floorController.updateFloor);

router.delete('/Floor/:floorNb', floorController.deleteFloor);

module.exports = router;