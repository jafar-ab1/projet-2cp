const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const validate = require('../middlewares/validation.middleware');
const userSchema = require('../validation/userValidation');

router.get('/', userController.getAllUsers);

router.get('/:email',validate(userSchema.emailSchema, 'params'), userController.getUserByEmail);

router.get('/checkOut/:email/:roomNumber',validate(userSchema.sendEmailValidation, 'params'), userController.sendCheckoutEmail);

router.put('/:email',validate(userSchema.emailSchema, 'params'), validate(userSchema.updateUserSchema), userController.modifyUser);

router.delete('/:email',validate(userSchema.emailSchema, 'params'), userController.suppUser);

module.exports = router;