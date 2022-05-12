const User = require('../db/User.model');
const ApiError = require('../error/ApiError');
const { userValidator } = require('../validators');

const checkIsEmailDuplicate = async (req, res, next) => {
  try {
    const { email = '' } = req.body;

    if (!email) {
      throw new ApiError('Email is missing', 400)
    }

    const isUserPresent = await User.findOne( { email: email.toLowerCase().trim() });

    if (isUserPresent) {
      next(new ApiError(`User with email: ${email} already exist`, 409))
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
      next(new ApiError('User not exist', 404));
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
      next (new ApiError(error.details[0].message, 400));
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
  newUserValidator
};
