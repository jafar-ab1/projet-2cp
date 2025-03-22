import express from 'express';

import Feed_back from '../models/Feed_back.js';
import Feed_backService from '../services/feed_backService.js';
import Feed_backController  from'../controllers/feed_backControl.js';

const feed_backService = new Feed_backService(Feed_back);
const feed_backController = new Feed_backController(feed_backService);

const router = express.Router();

// Récupérer tous les feedbacks
router.get('', feed_backController.getAll);

// Récupérer un feedback par son ID
router.get('/Guest/:guestId/Room/:roomId', feed_backController.get);

// Ajouter un nouveau feedback
router.post('/', feed_backController.create);

// Supprimer un feedback
router.delete('/Guest/:guestId/Room/:roomId', feed_backController.delete);

export default router;