const User = require('../db/User.model');
const ApiError = require('../error/ApiError');
const { userValidator, queryValidator, updateUserValidator } = require('../validators');
const { statusEnum, userErrorsEnum } = require("../constants");

const checkIsEmailDuplicate = async (req, res, next) => {
  try {
    const { email = '' } = req.body;

    const isUserPresent = await User.findOne( { email: email.toLowerCase().trim() });

    if (isUserPresent) {
      next(new ApiError(userErrorsEnum.emailExist, statusEnum.conflict))
      return;
    }

    next()

  } catch (e) {
    next(e);
  }
}

const checkIsUserPresent = async (req, res, next) => {
  try {
    const {userId} = req.params;
    
    const userById = await User.findById(userId);
    
    if (!userById) {
      next(new ApiError(userErrorsEnum.userNotExist, statusEnum.notFound));
      return;
    }

    req.user = userById;

    next();
  } catch (e) {
    next(e);
  }
}


const newUserValidator = (req, res, next) => {
  try {

    const { error, value } = userValidator.newUserJoiSchema.validate(req.body);

    if (error) {
      next (new ApiError(error.details[0].message, statusEnum.badRequest));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next (e);
  }
}

const userQueryValidator = (req, res, next) => {
  try {

    const { error } = queryValidator.queryJoiSchema.validate(req.body);

    if (error) {
      next (new ApiError(error.details[0].message, statusEnum.badRequest));
      return;
    }

    next();
  } catch (e) {
    next (e);
  }
}

const userUpdateValidator = (req, res, next) => {
  try {

    const { error, value } = updateUserValidator.updateUserJoiSchema.validate(req.body);

    if (error) {
      next (new ApiError(error.details[0].message, statusEnum.badRequest));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next (e);
  }
}


module.exports = {
  checkIsEmailDuplicate,
  checkIsUserPresent,
  newUserValidator,
  userUpdateValidator,
  userQueryValidator
};
