const { Router } = require('express');

const { authController } = require('../contollers/');
const { userMiddleware, authMiddleware } = require('../middlewares');

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

module.exports = authRouter;
