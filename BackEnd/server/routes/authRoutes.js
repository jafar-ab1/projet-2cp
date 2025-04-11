const express = require('express');
const authController = require('../controllers/authControl');
const validate = require("../middealwares/validation.middleware.js")
const { registerUserValidationSchema, loginUserValidationSchema } = require('../validation/auth.validation');

const router = express.Router();

router.post('/register', 
    [ validate(registerUserValidationSchema) ],
    authController.register
);

router.post('/login', 
    [ validate(loginUserValidationSchema) ],
    authController.login
);

module.exports = router;