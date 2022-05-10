const Car = require("../db/Car.model");
const ApiError = require("../error/ApiError");

module.exports = {

  getAllCars: async (req, res, next) => {
    try{
      const {limit, page} = req.query

      if (limit < 0 && page < 0) {
        next(new ApiError('Incorrect value', 400));
      }

      const skip = (page - 1) * limit;

      const cars = await Car.find().limit(limit).skip(skip);

      const countAllCars = await Car.count({});

      res.json({
        page,
        perPage: limit,
        countAllCars,
        data: cars
      });

    } catch (e) {
      next(e);
    }
  },

  getCarById: async (req, res, next) => {

    try {

      const {carId} = req.params;
      const car = await Car.findById(carId);

      res.json(car);

    } catch (e) {
      next(e);
    }

  },

  createCar: async (req, res, next) => {

    try {
      const createCar = await Car.create(req.body);

      res.status(201).json(createCar);
    } catch (e) {
      next (e);
    }
  },

  updateCar: async (req, res, next) => {

    try {
      const { name } = req.body;

      const car = await Car.findOneAndUpdate({name: name.trim()});

      res.json(car);

    } catch (e) {
      next(e);
    }

  },

  deleteCar: async (req, res, next) => {

    try {

      const {carId} = req.params;
      const car = await Car.findById(carId);

      res.json(car);

    } catch (e) {
      next(e);
    }

  }
}
