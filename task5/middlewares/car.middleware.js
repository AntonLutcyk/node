const Car = require('../db/Car.model');
const ApiError = require("../error/ApiError");
const { carValidator, updateCarValidator } = require('../validators');
const { statusEnum, carErrorsEnum } = require("../constants");


const checkIsCarNumbDuplicate = async (req, res, next) => {
  try {
    const { carNumb = '' } = req.body;

    const isCarPresent = await Car.findOne( { email: carNumb.trim() });

    if (isCarPresent) {
      next(new ApiError(carErrorsEnum.carNumbExist, statusEnum.conflict))
      return;
    }

    next()

  } catch (e) {
    next(e);
  }
}

const checkIsCarPresent = async (req, res, next) => {
  try {
    const {carId} = req.params;

    const carById = await Car.findById(carId);

    if (!carById) {
      next(new ApiError(carErrorsEnum.carNotExist, statusEnum.notFound));
      return;
    }

    req.car = carById;

    next();
  } catch (e) {
    next(e);
  }
}

const newCarValidator = (req, res, next) => {
  try {

    const { error, value } = carValidator.newCarJoiSchema.validate(req.body);

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

const carUpdateValidator = (req, res, next) => {
  try {

    const { error, value } = updateCarValidator.updateCarJoiSchema.validate(req.body);

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
  checkIsCarNumbDuplicate,
  checkIsCarPresent,
  newCarValidator,
  carUpdateValidator
};
