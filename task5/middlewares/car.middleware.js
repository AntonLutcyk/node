const Car = require('../db/Car.model');
const ApiError = require("../error/ApiError");
const { carValidator } = require("../validators");

const checkIsCarNumbDuplicate = async (req, res, next) => {
  try {
    const { carNumb = '' } = req.body;

    const car = await Car.findOne( { carNumb: carNumb.trim() });

    if (car) {
      res
        .status(409)
        .json({
          message: `Car with number: ${carNumb} already exist`
        })
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
      next(new ApiError('Car not exist', 404));
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
  checkIsCarNumbDuplicate,
  checkIsCarPresent,
  newCarValidator
};
