const express = require('express');
const router = express.Router();
const passController = require('../controllers/passwordController');

router.post ('/foget-password', passController.forgotPassword);

router.post('/reset-password', passController.resetPassword);

module.exports = router;