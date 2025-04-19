const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feed_backControl');
const validate = require("../middlewares/validation.middleware");
const {createSchema, idSchema} = require('../validation/feedBackValidation')


// Récupérer tous les feedbacks
router.get('/', feedbackController.getAllFeed_backs);

// Récupérer un feedback par son ID
router.get('/:userId/:roomId',validate(idSchema, 'params'), feedbackController.getFeed_back);

router.get('/month', feedbackController.getFeed_backCurrentMonth);

// Ajouter un nouveau feedback
router.post('/',validate(createSchema), feedbackController.creatFeed_back);

// Supprimer un feedback
router.delete('/:userId/:roomId',validate(idSchema, 'params'), feedbackController.suppFeed_back);

module.exports = router;