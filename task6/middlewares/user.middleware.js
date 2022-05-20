const User = require('../db/User.model');
const ApiError = require('../error/ApiError');
const {userValidator, updateUserValidator} = require('../validators');
const {statusEnum, userErrorsEnum} = require("../constants");
const {validateToken} = require('../services/auth.service');
const {authService} = require("../services");

const checkIsEmailDuplicate = async (req, res, next) => {
  try {
    const {email = ''} = req.body;

    const isUserPresent = await User.findOne({email: email.toLowerCase().trim()});

    if (isUserPresent) {
      next(new ApiError(userErrorsEnum.emailExist, statusEnum.conflict))
      return;
    }

    next()

  } catch (e) {
    next(e);
  }
}

const createUserValidator = (req, res, next) => {
  try {

    const {error, value} = userValidator.newUserJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, statusEnum.badRequest));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

const userUpdateValidator = (req, res, next) => {
  try {

    const {error, value} = updateUserValidator.updateUserJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, statusEnum.badRequest));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

//eslint-disable-next-line arrow-body-style
const dynamicallyUser = (paramName = '_id', where = 'body', dataBaseField = paramName) => {
  return async (req, res, next) => {
    try {
      const getObj = req[where];
      
      if(!getObj || typeof getObj !== 'object') {
        next(new ApiError(userErrorsEnum.wrongParams), statusEnum.badRequest);
        return;
      }
      
      const param = getObj[paramName];

      const user = await User.findOne({[dataBaseField]: param}).select('+password');

      if (!user) {
        next(new ApiError(userErrorsEnum.userNotExist, statusEnum.notFound));
        return;
      }

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  dynamicallyUser,
  checkIsEmailDuplicate,
  createUserValidator,
  userUpdateValidator
}

