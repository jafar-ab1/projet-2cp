const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation.middleware.js');

const dashConrtoll = require('../controllers/dashController');

const floorValidation = require('../validation/floorValidation');
const roomScehma = require('../validation/roomValidation');


//floorStatus
router.get('/status/:status', validate(floorValidation.statusSchema, 'params'), dashConrtoll.countFloorStatus);



//overwiew
router.get('/today/in', dashConrtoll.getCheck_in);

router.get('/today/out', dashConrtoll.getCheck_out);

router.get('/inHotel', dashConrtoll.inHotel);

router.get('/countStatus/:status0', validate(roomScehma.roomStatus0Schema, 'params'), dashConrtoll.countRoomsByStatus0); //Available, Occupied



//roomStatus
router.get('/count/:status0/:type', validate(roomScehma.roomTypeAndStatus0CountSchema, 'params'), dashConrtoll.countRoomsByTypeAndStatus0);



//rooms
router.get('/countType/:type', validate(roomScehma.roomTypeCountSchema, 'params'), dashConrtoll.countRoomsByType);


//addGuest
router.get('/addGuest/:userId', dashConrtoll.AddGuest);


module.exports = router;