const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feed_backControl');

const validate = require("../middlewares/validation.middleware");

const {createSchema, emailAndRoomSchema} = require('../validation/feedBackValidation');
const userSchema = require('../validation/userValidation');


// Récupérer tous les feedbacks
router.get('/', feedbackController.getAllFeed_backs);

// Récupérer un feedback par son ID
router.get('/:email/:roomNumber',validate(emailAndRoomSchema, 'params'), feedbackController.getFeed_backByEmailAndRoomNumber);

router.get('/find/by/email/:email', validate(userSchema.emailSchema, 'params'), feedbackController.getFeed_backByEmail);

router.get('/month', feedbackController.getFeed_backCurrentMonth);

// Ajouter un nouveau feedback
router.post('/',validate(createSchema), feedbackController.creatFeed_back);

// Supprimer un feedback
router.delete('/:email/:roomNumber',validate(emailAndRoomSchema, 'params'), feedbackController.suppFeed_back);

module.exports = router;