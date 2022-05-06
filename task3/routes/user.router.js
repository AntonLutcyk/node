const { Router } = require('express');

const userController = require('../contollers/user.controller');
const userMiddlewares = require('../middlewares/user.middleware');

const {getAllUsers, getUserById, createUser} = require('../contollers/user.controller');

const userRouter = Router();

module.exports = userRouter;

userRouter.get('/', userController.getAllUsers);

userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.checkAge, userController.createUser);

userRouter.delete('/:userId', userController.deleteUser);

userRouter.get('/:userId', userController.getUserById);



