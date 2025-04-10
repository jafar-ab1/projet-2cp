const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomControl');


router.get('/', roomController.getAllRooms);

router.get('/Room/:type', roomController.getByType)

router.get('/:id', roomController.getRoomById);

router.post('/', roomController.creatRoom);

router.put('/:id', roomController.modifyRoom);

router.delete('/:id', roomController.suppRoom);

module.exports = router;