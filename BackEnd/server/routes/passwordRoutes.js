const express = require('express');
const router = express.Router();
const passController = require('../controllers/passwordController');

const validate = require('../middlewares/validation.middleware');

const useValidation = require('../validation/userValidation');

router.post('/forget-password',validate(useValidation.emailSchema), passController.forgotPassword);

router.post('/reset-password', passController.resetPassword);

module.exports = router;