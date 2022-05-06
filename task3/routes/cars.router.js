const { Router } = require('express');

const carController = require('../contollers/car.controller');
const carMiddlewares = require('../middlewares/car.middleware');

const {getAllCars, getCarById, createCar} = require('../contollers/car.controller');

const carRouter = Router();

module.exports = carRouter;

carRouter.get('/', carController.getAllCars);

carRouter.post('/', carMiddlewares.checkIsCarNumbDuplicate, carMiddlewares.checkAge, carController.createCar);

carRouter.delete('/:carId', carController.deleteCar);

carRouter.get('/:carId', carController.getCarById);