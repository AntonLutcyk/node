const {Router} = require('express');

const userController = require('../contollers/user.controller');

const userMiddlewares = require('../middlewares/user.middleware');

const userRouter = Router();

module.exports = userRouter;

userRouter.get('/', userController.getAllUsers);

userRouter.post('/',
  userMiddlewares.checkUserGender,
  userMiddlewares.checkIsEmailDuplicate,
  userMiddlewares.checkAge,
  userController.createUser);

userRouter.all('/userId', userMiddlewares.checkIsUserPresent);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.get('/:userId', userController.getUserById);
userRouter.patch('/:userId', userController.updateUser);
