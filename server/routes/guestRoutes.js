const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestControl');

router.get('/', guestController.getAllGuests);

router.get('/:id', guestController.getGuestById);

router.post('/', guestController.creatGuest);

router.put('/:id', guestController.modifyGuest);

router.delete('/:id', guestController.suppGuest);

module.exports = router;