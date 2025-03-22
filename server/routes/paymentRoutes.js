import express from 'express';

import Payment from '../models/Payments.js';
import PaymentService from '../services/paymentsService.js';
import PaymentController from'../controllers/paymentControl.js';

const paymentService = new PaymentService(Payment);
const paymentController = new PaymentController(paymentService);

const router = express.Router();

router.get('/', paymentController.getAll);

router.get('/Guest/:id', paymentController.getByGuestId);

router.put('/', paymentController.create);

export default router;