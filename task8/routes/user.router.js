const {Router} = require('express');

const userController = require('../contollers/user.controller');

const userMiddlewares = require('../middlewares/user.middleware');

const userRouter = Router();

module.exports = userRouter;

userRouter.get('/', userController.getAllUsers);

userRouter.post('/',
  userMiddlewares.createUserValidator,
  userMiddlewares.checkIsEmailDuplicate,
  userController.createUser);


userRouter.all('/:userId', userMiddlewares.dynamicallyUser('userId', 'params', '_id'));
userRouter.delete('/:userId', userController.deleteUser);
userRouter.get('/:userId', userController.getUserById);

userRouter.patch('/:userId',
  userMiddlewares.checkIsEmailDuplicate, 
  userMiddlewares.createUserValidator,
  userController.updateUser);
    
