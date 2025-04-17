const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation.middleware.js');

const floorController= require ('../controllers/floorControl');
const reservationController = require('../controllers/reserveControl');
const roomController = require('../controllers/roomControl');


const floorValidation = require('../validation/floorValidation');
const roomScehma = require('../validation/roomValidation');


//floor
router.get('/status/:status', validate(floorValidation.statusSchema, 'params'), floorController.countFloorStatus);

//reservation
router.get('/today/in', reservationController.getCheck_in);

router.get('/today/out', reservationController.getCheck_out);


//room
router.get('/countStatus/:status', validate(roomScehma.roomStatusSchema, 'params'), roomController.countRoomsByStatus);

router.get('/countType/:type', validate(roomScehma.roomTypeCountSchema, 'params'), roomController.countRoomsByType);

router.get('/count/:status/:type', validate(roomScehma.roomTypeAndStatusCountSchema, 'params'), roomController.countRoomsByTypeAndStatus);

