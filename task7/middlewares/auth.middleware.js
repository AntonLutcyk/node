const { authService } = require('../services');
const { authValidator } = require('../validators');
const ApiError = require('../error/ApiError');
const OAuth = require('../db/OAuth.model');
const { tokenTypeEnum } = require("../constants");
const { statusEnum } = require('../constants');
const { authErrorEnum } = require('../constants');
const { headersEnum } = require('../constants');

async function checkAccessToken(req, res, next) {
  try {
    const access_token = req.get(headersEnum.authorization);

    authService.validateToken(access_token);

    const tokenValue = await OAuth.findOne({access_token}).populate('user_id');

    if (!tokenValue || !tokenValue.user_id)
    {
      next(new ApiError(authErrorEnum.wrongToken), statusEnum.badRequest);
      return;
    }

    req.authUser = tokenValue.user_id;

  } catch (e) {
    next(e);
  }
}

async function checkRefreshToken(req, res, next) {
  try {
    const refresh_token = req.get(headersEnum.authorization);

    if (!refresh_token) {
      next(new ApiError(authErrorEnum.tokenNotExist, statusEnum.notFound));
      return
    }

    authService.validateToken(refresh_token, tokenTypeEnum.REFRESH);

    const tokenData = await OAuth.findOne({ refresh_token }).populate('user_id');

    if (!tokenData || !tokenData.user_id) {
      next(new ApiError(authErrorEnum.noValidToken, statusEnum.badRequest));
      return
    }

    req.authUser = tokenData.user_id;

    next();

  } catch (e) {
    next(e);
  }
}

function isLoginValuesValid(req, res, next) {
  try {
    const {value, error} = authValidator.loginSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message))
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next (e);
  }
}

module.exports = {
  checkAccessToken,
  checkRefreshToken,
  isLoginValuesValid
}
