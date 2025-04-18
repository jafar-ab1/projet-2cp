const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation.middleware.js');

const dashConrtoll = require('../controllers/dashController');


const floorValidation = require('../validation/floorValidation');
const roomScehma = require('../validation/roomValidation');


//floor
router.get('/status/:status', validate(floorValidation.statusSchema, 'params'), dashConrtoll.countFloorStatus);

//reservation
router.get('/today/in', dashConrtoll.getCheck_in);

router.get('/today/out', dashConrtoll.getCheck_out);

//room
router.get('/countStatus/:status', validate(roomScehma.roomStatusSchema, 'params'), dashConrtoll.countRoomsByStatus);

router.get('/countType/:type', validate(roomScehma.roomTypeCountSchema, 'params'), dashConrtoll.countRoomsByType);

router.get('/count/:status/:type', validate(roomScehma.roomTypeAndStatusCountSchema, 'params'), dashConrtoll.countRoomsByTypeAndStatus);

module.exports = router;