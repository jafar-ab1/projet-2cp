const express = require('express');
const router = express.Router();
const paymentControllers = require('../controllers/paymentControl');

router.get('/', paymentControllers.getPayment);

router.put('/', paymentControllers.getPayment);

module.exports = router;