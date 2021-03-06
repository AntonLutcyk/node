const { authService, emailService } = require('../services');
const OAuth = require('../db/OAuth.model');
const { headersEnum, emailActionsEnum } = require('../constants');


module.exports = {

  login: async (req, res, next) => {
    try {

      const { user, body: { pass } } = req;
      const tokenPair = authService.generateTokenPair( { userId: user._id });

      await emailService.sendMail('antohaa1337@gmail.com', emailActionsEnum.WELCOME);
      await authService.comparePassword(user.password, pass);
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
      const createTokenPair = authService.generateTokenPair({userId: authUsers._id});
      
      await OAuth.deleteOne({ refresh_token });
      await OAuth.create({_user_id: authUsers._id, ...createTokenPair});

      res.json({
        authUsers,
        ...createTokenPair
      });
    } catch (e) {
      next(e);
    }
  }

}

