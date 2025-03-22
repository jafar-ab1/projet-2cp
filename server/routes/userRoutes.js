import express from 'express';

import User from '../models/User.js';
import UserService from '../services/userService.js';
import UserController from'../controllers/userControl.js';

const userService = new UserService(User);
const userController = new UserController(userService);

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.post('/', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

export default router;