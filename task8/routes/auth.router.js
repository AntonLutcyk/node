const { Router } = require('express');

const { authController } = require('../contollers/');
const { userMiddleware, authMiddleware } = require('../middlewares');
const {actionTypesENUM} = require("../constants");

const authRouter = Router();

authRouter.post('/login',
  authMiddleware.isLoginValuesValid,
  userMiddleware.dynamicallyUser('email'),
  authController.login);

authRouter.post('/logout',
  authMiddleware.checkAccessToken,
  authController.logout);

authRouter.post('/refresh',
  authMiddleware.checkRefreshToken,
  authController.refresh
);

authRouter.post('/password/forgot',
  userMiddleware.dynamicallyUser('email'),
  authController.forgotPassword);

authRouter.patch('/password/forgot',
  authMiddleware.checkActionToken(actionTypesENUM.FORGOT_PASSWORD),
  authMiddleware.isPasswordValid,
  authController.setPasswordAfterForgot);

module.exports = authRouter;
