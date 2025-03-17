const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feed_backControl');

// Récupérer tous les feedbacks
router.get('', feedbackController.getAllFeed_backs);

// Récupérer un feedback par son ID
router.get('/Guest/:guestId/Room/:roomId', feedbackController.getFeed_back);

// Ajouter un nouveau feedback
router.post('/', feedbackController.creatFeed_back);

// Supprimer un feedback
router.delete('/Guest/:guestId/Room/:roomId', feedbackController.suppFeed_back);

module.exports = router;