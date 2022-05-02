const { Router } = require('express');

const userController = require('../contollers/user.controller');

const {getAllUsers, getUserById, createUser} = require("../contollers/user.controller");

const userRouter = Router();

module.exports = userRouter;

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userController.getUserById);

userRouter.post('/', userController.createUser);

userRouter.delete('/:userId', userController.deleteUser);



