const Car = require("../db/Car.model");
const { statusEnum } = require('../constants');

module.exports = {

  getAllCars: async (req, res, next) => {
    try{
      const {limit, page} = req.query

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

      res.status(statusEnum.created).json(createCar);
    } catch (e) {
      next (e);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const { carId } = req.body;
      const { name, age, engCapacity, carNumb } = req.body;

      const car = await Car.findOneAndUpdate(carId, {
        name,
        age,
        engCapacity,
        carNumb,
      });

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
