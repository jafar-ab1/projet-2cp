const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.modifyUser);

router.delete('/:id', userController.suppUser);

module.exports = router;