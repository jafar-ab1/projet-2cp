import express from 'express';

import Settings from '../models/Settings.js';
import SettingsService from '../services/settingsService.js';
import SettingsController from'../controllers/settingsControl.js';

const settingsService = new SettingsService(Settings);
const settingsController = new SettingsController(settingsService);

const router = express.Router();

// Récupérer les paramètres globaux
router.get('/', settingsController.get);

// Mettre à jour les paramètres globaux
router.put('/', settingsController.update);

export default router;