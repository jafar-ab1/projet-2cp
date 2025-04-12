const express = require('express');
const router = express.Router();
const paymentControllers = require('../controllers/paymentControl');
const validate = require('../middlewares/validation.middleware');
const {userIdSchema,
    createPaymentSchema} = require('../validation/paymentValidation')

router.get('/', paymentControllers.getAll);

router.get('/:userId',validate(userIdSchema, 'params'), paymentControllers.getPayment);

router.post('/',validate(createPaymentSchema), paymentControllers.creatPayment);

module.exports = router;