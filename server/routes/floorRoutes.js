import express from 'express';

import Floor from '../models/Floor.js';
import FloorService from '../services/floorService.js';
import FloorController from'../controllers/floorControl.js';

const floorService = new FloorService(Floor);
const floorController = new FloorController(floorService);

const router = express.Router();

router.get('/', floorController.getAll);

router.get('/Floor/:floorNb', floorController.getByFloorNb);

router.post('/', floorController.create);

router.put('/Floor/:floorNb', floorController.update);

router.delete('/Floor/:floorNb', floorController.delete);

export default router;