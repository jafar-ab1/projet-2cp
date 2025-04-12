const express = require('express');
const authController = require('../controllers/authControl');
const validate = require("../middlewares/validation.middleware.js")
const { registerUserValidationSchema, loginUserValidationSchema } = require("../validation/auth.validation.js");
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