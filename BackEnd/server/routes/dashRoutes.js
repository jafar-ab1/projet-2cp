const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation.middleware.js');

const dashConrtoll = require('../controllers/dashController');

const floorValidation = require('../validation/floorValidation');
const roomScehma = require('../validation/roomValidation');


//floor
router.get('/status/:status0', validate(floorValidation.statusSchema, 'params'), dashConrtoll.countFloorStatus);

//reservation
router.get('/today/in', dashConrtoll.getCheck_in);

router.get('/today/out', dashConrtoll.getCheck_out);

router.get('/addGuest/:userId', dashConrtoll.AddGuest);

//room
router.get('/countStatus/:status0', validate(roomScehma.roomStatus0Schema, 'params'), dashConrtoll.countRoomsByStatus0);

router.get('/countType/:type', validate(roomScehma.roomTypeCountSchema, 'params'), dashConrtoll.countRoomsByType);

router.get('/count/:status0/:type', validate(roomScehma.roomTypeAndStatus0CountSchema, 'params'), dashConrtoll.countRoomsByTypeAndStatus0);



module.exports = router;