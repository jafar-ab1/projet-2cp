const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const validate = require('../middlewares/validation.middleware');
const userSchema = require('../validation/userValidation');

router.get('/',validate(userSchema.userSchema), userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id',validate(userSchema.updateUserSchema), userController.modifyUser);

router.delete('/:id',validate(userSchema.userSchema), userController.suppUser);

module.exports = router;