const express = require('express');
const authController = require('../controllers/authControl');
const validate = require("../middlewares/validation.middleware.js")
const { registerUserValidationSchema, loginUserValidationSchema } = require("../validation/auth.validation.js");
const router = express.Router();

const config = require('../../config.js');

/*ici pour creer un ustilisateur avec body suivant:
    fullName, email, password, mobileNumber, role, 
et il re donne son token et ses données
*/
router.post('/register', 
    [ validate(registerUserValidationSchema) ],
    authController.register
);


/* ici pour se connecter avec un emai qui a deja fais spnt register avec body:
    email, password
*/
router.post('/login', 
    [ validate(loginUserValidationSchema) ],
    authController.login
);

router.post('/send-verification-code', authController.sendVerificationCode);

router.post('/verify-email', authController.verifyEmail);


module.exports = router;