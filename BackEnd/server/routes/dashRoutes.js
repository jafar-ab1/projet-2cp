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

router.get('/countStatus/:status1', validate(roomScehma.roomStatus1Schema, 'params'), dashConrtoll.countRoomsByStatus1); //Available, Occupied


//roomStatus
router.get('/count/:status0/:status1', validate(roomScehma.roomStatus0AndStatus1CountSchema, 'params'), dashConrtoll.countRoomsByStatus0AndStatus1);


//rooms
router.get('/countTypeAvailable/:type', validate(roomScehma.roomTypeCountSchema, 'params'), dashConrtoll.countRoomsByTypeAndAvailable);


//addGuest
router.get('/addGuest/:email', dashConrtoll.AddGuest);


module.exports = router;