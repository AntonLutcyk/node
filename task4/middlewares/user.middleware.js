const User = require('../db/User.model');
const ApiError = require('../error/ApiError');

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

const checkAge = async (req, res, next) => {
  try {
    const {age = ''} = await req.body;

    if (age < 0) {
      throw new Error('Incorrect age')
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

const checkUserGender = (req, res, next) => {
  try{
    const { gender } = req.body;

    if(gender !== 'male' && gender !== 'female') {
      next(new ApiError('Wrong gender', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkIsEmailDuplicate,
  checkAge,
  checkIsUserPresent,
  checkUserGender
};
