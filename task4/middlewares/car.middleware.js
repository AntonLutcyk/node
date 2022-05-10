const Car = require('../db/Car.model');
const ApiError = require("../error/ApiError");

const checkAge = async (req, res, next) => {
  try {
    const {age = ''} = await req.body;

    if (age < 0) {
      res
        .status(409)
        .json({
          message: 'Incorrect age'
        })
      return;
    }

    next()

  } catch (e) {
    res
      .status(400)
      .json({
        message: e.message
      })
  }
}

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
    res
      .status(400)
      .json({
        message: e.message
      })
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

module.exports = {
  checkAge,
  checkIsCarNumbDuplicate,
  checkIsCarPresent
};
