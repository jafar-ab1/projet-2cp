const express = require('express');
const authController = require('../controllers/authControl');
<<<<<<< HEAD
const validate = require("../middealwear/validation.midellwear")
const { registerUserValidationSchema, loginUserValidationSchema } = require('../validation/authvalidation');
=======
const validate = require("../middealwares/validation.middleware.js")
const { registerUserValidationSchema, loginUserValidationSchema } = require('../validation/auth.validation');
>>>>>>> 4b203ab9495f15ae9a33adebd112bacfe609fecf

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