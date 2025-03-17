const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomControl');


router.get('/', roomController.getAllRooms);

router.get('/:id', roomController.getRoomById);

router.get('/Room/:type', roomController.getRoomsType);

router.post('/', roomController.creatRoom);

router.put('/:id', roomController.modifyRoom);

router.delete('/:id', roomController.suppRoom);

module.exports = router;