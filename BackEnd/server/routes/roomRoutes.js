const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomControl');
const validate = require('../middlewares/validation.middleware');
const roomScehma = require('../validation/roomValidation');


router.get('/', roomController.getAllRooms);

router.get('/:type', validate(roomScehma.roomTypeSchema, 'params'),roomController.getByType)

router.get('/number/:roomNumber', validate(roomScehma.roomNumberSchema, 'params'), roomController.getRoomByNumber);

router.get('/countStatus/:status', validate(roomScehma.roomStatusSchema, 'params'), roomController.countRoomsByStatus);

router.get('/countType/:type', validate(roomScehma.roomTypeCountSchema, 'params'), roomController.countRoomsByType);

router.get('/count/:status/:type', validate(roomScehma.roomTypeAndStatusCountSchema, 'params'), roomController.countRoomsByTypeAndStatus);

router.post('/',validate(roomScehma.createRoomSchema), roomController.creatRoom);

router.put('/:roomNumber', validate(roomScehma.updateRoomSchema), roomController.modifyRoom);

router.delete('/:roomNumber',validate(roomScehma.roomNumberSchema, 'params'),  roomController.suppRoom);



module.exports = router;