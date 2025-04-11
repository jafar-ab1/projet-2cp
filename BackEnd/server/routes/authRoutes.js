const express = require('express');
const authController = require('../controllers/authControl');
const validate = require("../middealwear/validation.midellwear")
const { registerUserValidationSchema, loginUserValidationSchema } = require('../validation/authvalidation');

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