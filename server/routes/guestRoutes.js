import express from 'express';

import Guest from '../models/Guest.js';
import GuestService from '../services/guestService.js';
import GuestController from '../controllers/guestControl.js';

const guestService = new GuestService(Guest);
const guestController = new GuestController(guestService);

const router = express.Router();

router.get('/', guestController.getAll);

router.get('/:id', guestController.getById);

router.post('/', guestController.create);

router.put('/:id', guestController.update);

router.delete('/:id', guestController.delete);

export default router;