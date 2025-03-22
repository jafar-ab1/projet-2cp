import express from 'express';

import Room from '../models/Room.js';
import RoomService from '../services/roomService.js';
import RoomController from '../controllers/roomControl.js';

const roomService = new RoomService(Room);
const roomController = new RoomController(roomService);


const router = express.Router();

router.get('/', roomController.getAll);

router.get('/:id', roomController.getById);

router.get('/Room/:type', roomController.getByType);

router.post('/', roomController.create);

router.put('/:id', roomController.update);

router.delete('/:id', roomController.delete);

export default router;