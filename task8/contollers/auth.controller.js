const { authService, emailService } = require('../services');
const { headersEnum, emailActionsEnum, actionTypesENUM } = require('../constants');
const SITE_URL = require('../config/config');
const OAuth = require('../db/OAuth.model');
const ActionToken = require('../db/ActionToken.model');
const User = require('../db/User.model');

module.exports = {

  login: async (req, res, next) => {
    try {

      const { user, body: { pass } } = req;

      await authService.comparePassword(user.password, pass);

      const tokenPair = authService.generateTokenPair( { userId: user._id });

      await OAuth.create({user_id: user._id, ...tokenPair});

      res.json({
        ...tokenPair,
        user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      await OAuth.deleteMany({ user_id: req.authUser._id });
      
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {

      const refresh_token = req.get(headersEnum.authorization);

      const authUsers = req.authUser;

      await OAuth.deleteOne({ refresh_token });

      const createTokenPair = authService.generateTokenPair({userId: authUsers._id});

      await OAuth.create({_user_id: authUsers._id, ...createTokenPair});

      res.json({
        authUsers,
        ...createTokenPair
      });
    } catch (e) {
      next(e);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {

      const { user } = req;

      const token = authService.generateActionToken({userId: user._id});

      await ActionToken.create({
        token,
        user_id: user._id,
        actionType: actionTypesENUM.FORGOT_PASSWORD
      })

      const restorePassUrl = `${SITE_URL}/password/forgot?token=${token}`

      await emailService.sendMail(
        'antohaa1337@gmail.com',
        emailActionsEnum.FORGOT_PASSWORD,
        { restorePassUrl, userName: user.name }
      )
      res.json('ok');
    } catch (e) {
      next(e);
    }
  },

  setPasswordAfterForgot: async (req, res, next) => {
    try {

      const { user, body } = req;
      const newPass = await authService.hashPassword(body.password);

      await User.updateOne({_id: user._id}, { password: newPass});
      await OAuth.deleteMany({ user_id: user._id});
      await ActionToken.deleteOne( { token: body.token });

      res.json('ok');
    } catch (e) {
      next(e);
    }
  }
}

